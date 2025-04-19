
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
    
    // Prioritize finding a child's voice
    this.preferredVoice = this.voices.find(
      voice => voice.name.toLowerCase().includes("child")
    ) ||
    this.voices.find(
      voice => voice.name.toLowerCase().includes("kid")
    ) ||
    this.voices.find(
      voice => voice.name.toLowerCase().includes("young")
    ) ||
    this.voices.find(
      voice => voice.name.toLowerCase().includes("female") && voice.lang.startsWith("en")
    ) || 
    this.voices.find(
      voice => voice.lang.startsWith("en")
    ) ||
    this.voices[0];

    console.log("Available voices:", this.voices.map(v => v.name));
    console.log("Selected voice:", this.preferredVoice?.name);
  }
  
  public speak(text: string): void {
    if (!text) return;
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Always ensure we're using the same preferred voice
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
      console.log("Speaking with voice:", this.preferredVoice.name);
    }
    
    // Child-friendly speech settings - make slightly higher pitched
    utterance.rate = 0.9;  // Slightly slower
    utterance.pitch = 1.2; // Higher pitch for child-like voice
    utterance.volume = 1;
    
    this.synth.speak(utterance);
  }
  
  public stop(): void {
    this.synth.cancel();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public getCurrentVoice(): SpeechSynthesisVoice | null {
    return this.preferredVoice;
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
