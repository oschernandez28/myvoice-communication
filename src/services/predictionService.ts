import * as tf from '@tensorflow/tfjs';
import { CardSuggestion } from '@/types/aac';
import { communicationCards, trainingPairs } from '@/data/cardData';

// A simple model to suggest next cards based on input text
export class PredictionService {
  private vocabulary: Map<string, number> = new Map();
  private reverseVocabulary: Map<number, string> = new Map();
  private model: tf.LayersModel | null = null;
  private isModelLoaded = false;
  
  constructor() {
    this.buildVocabulary();
  }

  // Build vocabulary from all card labels and training pairs
  private buildVocabulary(): void {
    const allTexts = new Set<string>();
    
    // Add all card labels to vocabulary
    communicationCards.forEach(card => {
      const words = card.label.toLowerCase().split(/\s+/);
      words.forEach(word => allTexts.add(word));
    });
    
    // Add all training inputs
    trainingPairs.forEach(pair => {
      const inputWords = pair.input.toLowerCase().split(/\s+/);
      inputWords.forEach(word => allTexts.add(word));
    });
    
    // Create vocabulary mapping
    Array.from(allTexts).sort().forEach((word, index) => {
      this.vocabulary.set(word, index + 1); // Reserve 0 for padding
      this.reverseVocabulary.set(index + 1, word);
    });
  }

  // Convert text to a tensor of word indices
  private textToSequence(text: string): number[] {
    const words = text.toLowerCase().split(/\s+/);
    return words.map(word => this.vocabulary.get(word) || 0);
  }

  // Create and train the model
  public async trainModel(): Promise<void> {
    if (this.isModelLoaded) {
      console.log("Model is already loaded");
      return;
    }

    console.log("Training prediction model...");
    
    // Prepare training data
    const inputSequences: number[][] = [];
    const outputLabels: number[][] = [];
    
    trainingPairs.forEach(pair => {
      const inputSeq = this.textToSequence(pair.input);
      
      pair.output.forEach(outputText => {
        inputSequences.push(inputSeq);
        
        // One-hot encode the output (which card it is)
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
    
    // Convert to tensors
    const maxInputLength = Math.max(...inputSequences.map(seq => seq.length));
    const paddedInputs = inputSequences.map(seq => {
      while (seq.length < maxInputLength) {
        seq.push(0); // Pad with zeros
      }
      return seq;
    });
    
    const inputTensor = tf.tensor2d(paddedInputs);
    const outputTensor = tf.tensor2d(outputLabels);
    
    // Create a simple model
    const model = tf.sequential();
    
    // Embedding layer
    model.add(tf.layers.embedding({
      inputDim: this.vocabulary.size + 1, // +1 for padding
      outputDim: 8,
      inputLength: maxInputLength
    }));
    
    // Flatten
    model.add(tf.layers.flatten());
    
    // Dense layers
    model.add(tf.layers.dense({
      units: 16,
      activation: 'relu'
    }));
    
    // Output layer
    model.add(tf.layers.dense({
      units: communicationCards.length,
      activation: 'softmax'
    }));
    
    this.model = model;
    
    // Compile the model
    this.model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
    
    // Train the model
    await this.model.fit(inputTensor, outputTensor, {
      epochs: 100,
      batchSize: 4,
      shuffle: true,
    });
    
    console.log("Model training complete");
    this.isModelLoaded = true;
    
    // Clean up tensors
    inputTensor.dispose();
    outputTensor.dispose();
  }

  // Get predictions for input text
  public async getSuggestions(inputText: string, numSuggestions: number = 3): Promise<CardSuggestion[]> {
    if (!this.model || !this.isModelLoaded) {
      await this.trainModel();
    }

    if (!inputText || inputText.trim() === '') {
      return [];
    }
    
    // If we have an exact match in training data, use that for better initial suggestions
    const exactMatch = trainingPairs.find(pair => 
      pair.input.toLowerCase() === inputText.toLowerCase()
    );
    
    if (exactMatch) {
      return exactMatch.output.slice(0, numSuggestions).map(label => {
        const card = communicationCards.find(c => c.label.toLowerCase() === label.toLowerCase());
        return {
          label: card?.label || label,
          image: card?.image || '❓'
        };
      });
    }
    
    // Otherwise use the model
    const sequence = this.textToSequence(inputText);
    const maxInputLength = this.model.inputs[0].shape[1];
    
    // Pad the sequence
    while (sequence.length < maxInputLength) {
      sequence.push(0);
    }
    
    // Make prediction
    const inputTensor = tf.tensor2d([sequence]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    
    // Get top predictions
    const values = await prediction.data();
    const indices = Array.from(values).map((value, index) => ({ value, index }))
      .sort((a, b) => b.value - a.value)
      .slice(0, numSuggestions)
      .map(item => item.index);
    
    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();
    
    // Convert to suggestions
    return indices.map(index => ({
      label: communicationCards[index].label,
      image: communicationCards[index].image
    }));
  }
}

// Singleton instance
let predictionServiceInstance: PredictionService | null = null;

export const getPredictionService = (): PredictionService => {
  if (!predictionServiceInstance) {
    predictionServiceInstance = new PredictionService();
  }
  return predictionServiceInstance;
};
