
interface PhraseOption {
  generated_text: string;
}

export class HuggingFaceService {
  private static API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  private static API_URL = import.meta.env.VITE_HUGGINGFACE_API_URL;
  
  public static async getPhraseOptions(input: string): Promise<string[]> {
    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: input,
          parameters: {
            do_sample: true,
            top_k: 50,
            top_p: 0.95,
            temperature: 0.8,
            num_return_sequences: 3
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get phrase options');
      }
      
      const result: PhraseOption[] = await response.json();
      return result.map(option => option.generated_text);
    } catch (error) {
      console.error('Error getting phrase options:', error);
      return [input]; // Fallback to original input if API fails
    }
  }
}
