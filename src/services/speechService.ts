
// Simple wrapper for browser's SpeechSynthesis API
export class SpeechService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;
  
  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    
    // Chrome loads voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }
  
  private loadVoices(): void {
    this.voices = this.synth.getVoices();
    
    // Try to find a child-friendly voice
    this.preferredVoice = this.voices.find(
      voice => voice.name.toLowerCase().includes("child")
    ) ||
    this.voices.find(
      voice => voice.name.toLowerCase().includes("female") && voice.lang.startsWith("en")
    ) || 
    this.voices.find(
      voice => voice.lang.startsWith("en")
    ) ||
    this.voices[0];
  }
  
  public speak(text: string): void {
    if (!text) return;
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use preferred voice if available
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }
    
    // Child-friendly speech settings
    utterance.rate = 0.9;  // Slightly slower
    utterance.pitch = 1.1; // Slightly higher pitch
    utterance.volume = 1;
    
    this.synth.speak(utterance);
  }
  
  public stop(): void {
    this.synth.cancel();
  }
}

// Singleton instance
let speechServiceInstance: SpeechService | null = null;

export const getSpeechService = (): SpeechService => {
  if (!speechServiceInstance) {
    speechServiceInstance = new SpeechService();
  }
  return speechServiceInstance;
};
