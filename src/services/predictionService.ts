import * as tf from '@tensorflow/tfjs';
import { CardSuggestion } from '@/types/aac';
import { communicationCards, trainingPairs } from '@/data/cardData';

// A model that predicts next cards based on input text and expected category
export class PredictionService {
  private vocabulary: Map<string, number> = new Map();
  private reverseVocabulary: Map<number, string> = new Map();
  private model: tf.LayersModel | null = null;
  private isModelLoaded = false;

  constructor() {
    this.buildVocabulary();
  }

  // Build vocabulary from all words in cards and training pairs
  private buildVocabulary(): void {
    const allTexts = new Set<string>();

    communicationCards.forEach(card => {
      const words = card.label.toLowerCase().split(/\s+/);
      words.forEach(word => allTexts.add(word));
    });

    trainingPairs.forEach(pair => {
      const inputWords = pair.input.toLowerCase().split(/\s+/);
      inputWords.forEach(word => allTexts.add(word));

      pair.output.forEach(outputText => {
        const outputWords = outputText.toLowerCase().split(/\s+/);
        outputWords.forEach(word => allTexts.add(word));
      });
    });

    Array.from(allTexts).sort().forEach((word, index) => {
      this.vocabulary.set(word, index + 1); // reserve 0 for padding
      this.reverseVocabulary.set(index + 1, word);
    });
  }

  // Turn input text into array of word indices
  private textToSequence(text: string): number[] {
    const words = text.toLowerCase().split(/\s+/);
    return words.map(word => this.vocabulary.get(word) || 0);
  }

  // Train a basic model to map input → next card
  public async trainModel(): Promise<void> {
    if (this.isModelLoaded) {
      console.log("Model already loaded.");
      return;
    }

    console.log("Training prediction model...");

    const inputSequences: number[][] = [];
    const outputLabels: number[][] = [];

    trainingPairs.forEach(pair => {
      const inputSeq = this.textToSequence(pair.input);

      pair.output.forEach(outputText => {
        inputSequences.push(inputSeq);

        const outputIndex = communicationCards.findIndex(
          card => card.label.toLowerCase() === outputText.toLowerCase()
        );

        if (outputIndex !== -1) {
          const oneHot = new Array(communicationCards.length).fill(0);
          oneHot[outputIndex] = 1;
          outputLabels.push(oneHot);
        }
      });
    });

    const maxInputLength = Math.max(...inputSequences.map(seq => seq.length));
    const paddedInputs = inputSequences.map(seq => {
      while (seq.length < maxInputLength) seq.push(0);
      return seq;
    });

    const inputTensor = tf.tensor2d(paddedInputs);
    const outputTensor = tf.tensor2d(outputLabels);

    const model = tf.sequential();
    model.add(tf.layers.embedding({
      inputDim: this.vocabulary.size + 1,
      outputDim: 8,
      inputLength: maxInputLength
    }));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    model.add(tf.layers.dense({
      units: communicationCards.length,
      activation: 'softmax'
    }));

    this.model = model;

    this.model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    await this.model.fit(inputTensor, outputTensor, {
      epochs: 100,
      batchSize: 4,
      shuffle: true
    });

    console.log("Model training complete.");
    this.isModelLoaded = true;

    inputTensor.dispose();
    outputTensor.dispose();
  }

  // 🔥 NEW: Predict next cards filtered by a category (e.g. verbs or objects)
  public async getSuggestionsForCategory(inputText: string, targetCategory: string, numSuggestions: number = 3): Promise<CardSuggestion[]> {
    if (!this.model || !this.isModelLoaded) {
      await this.trainModel();
    }

    if (!inputText || inputText.trim() === '') {
      return [];
    }

    const sequence = this.textToSequence(inputText);
    const maxInputLength = this.model.inputs[0].shape[1];

    while (sequence.length < maxInputLength) {
      sequence.push(0);
    }

    const inputTensor = tf.tensor2d([sequence]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;

    const values = await prediction.data();
    const indicesWithValues = Array.from(values).map((value, index) => ({ value, index }));

    // ⭐ FILTER predicted indices to match target category
    const filtered = indicesWithValues
      .filter(item => communicationCards[item.index].category === targetCategory)
      .sort((a, b) => b.value - a.value)
      .slice(0, numSuggestions);

    inputTensor.dispose();
    prediction.dispose();

    return filtered.map(item => ({
      label: communicationCards[item.index].label,
      image: communicationCards[item.index].image
    }));
  }

  // (Optional: keep original getSuggestions if needed elsewhere)
  public async getSuggestions(inputText: string, numSuggestions: number = 3): Promise<CardSuggestion[]> {
    if (!this.model || !this.isModelLoaded) {
      await this.trainModel();
    }

    const sequence = this.textToSequence(inputText);
    const maxInputLength = this.model.inputs[0].shape[1];

    while (sequence.length < maxInputLength) {
      sequence.push(0);
    }

    const inputTensor = tf.tensor2d([sequence]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;

    const values = await prediction.data();
    const indices = Array.from(values)
      .map((value, index) => ({ value, index }))
      .sort((a, b) => b.value - a.value)
      .slice(0, numSuggestions)
      .map(item => item.index);

    inputTensor.dispose();
    prediction.dispose();

    return indices.map(index => ({
      label: communicationCards[index].label,
      image: communicationCards[index].image
    }));
  }
}

// Singleton export
let predictionServiceInstance: PredictionService | null = null;

export const getPredictionService = (): PredictionService => {
  if (!predictionServiceInstance) {
    predictionServiceInstance = new PredictionService();
  }
  return predictionServiceInstance;
};
