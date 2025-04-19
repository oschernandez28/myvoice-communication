import { CommunicationCard, CardCategory } from "@/types/aac";

export const categories: CardCategory[] = [
  { id: "subjects", name: "Who", color: "aac-blue" },
  { id: "verbs", name: "Action", color: "aac-green" },
  { id: "objects", name: "What", color: "aac-yellow" },
  { id: "places", name: "Where", color: "aac-orange" },
  { id: "feelings", name: "Feelings", color: "aac-pink" },
  { id: "time", name: "When", color: "aac-purple" },
];

export const communicationCards: CommunicationCard[] = [
  { id: "i", label: "Me", image: "👤", category: "subjects", color: "aac-blue" },
  { id: "we", label: "We", image: "👥", category: "subjects", color: "aac-blue" },
  { id: "mom", label: "Mom", image: "👩", category: "subjects", color: "aac-blue" },
  { id: "dad", label: "Dad", image: "👨", category: "subjects", color: "aac-blue" },
  
  { id: "want", label: "want", image: "✨", category: "verbs", color: "aac-green" },
  { id: "need", label: "need", image: "❗", category: "verbs", color: "aac-green" },
  { id: "go", label: "go", image: "🚶", category: "verbs", color: "aac-green" },
  { id: "play", label: "play", image: "🎮", category: "verbs", color: "aac-green" },
  { id: "eat", label: "eat", image: "🍽️", category: "verbs", color: "aac-green" },
  { id: "drink", label: "drink", image: "🥤", category: "verbs", color: "aac-green" },
  
  { id: "water", label: "water", image: "💧", category: "objects", color: "aac-yellow" },
  { id: "food", label: "food", image: "🍎", category: "objects", color: "aac-yellow" },
  { id: "toy", label: "toy", image: "🧸", category: "objects", color: "aac-yellow" },
  { id: "book", label: "book", image: "📚", category: "objects", color: "aac-yellow" },
  { id: "ball", label: "ball", image: "⚽", category: "objects", color: "aac-yellow" },
  
  { id: "home", label: "home", image: "🏠", category: "places", color: "aac-orange" },
  { id: "school", label: "school", image: "🏫", category: "places", color: "aac-orange" },
  { id: "park", label: "park", image: "🏞️", category: "places", color: "aac-orange" },
  { id: "bathroom", label: "bathroom", image: "🚽", category: "places", color: "aac-orange" },
  
  { id: "happy", label: "happy", image: "😊", category: "feelings", color: "aac-pink" },
  { id: "sad", label: "sad", image: "😢", category: "feelings", color: "aac-pink" },
  { id: "tired", label: "tired", image: "😴", category: "feelings", color: "aac-pink" },
  { id: "angry", label: "angry", image: "😠", category: "feelings", color: "aac-pink" },
  
  { id: "now", label: "now", image: "⌛", category: "time", color: "aac-purple" },
  { id: "later", label: "later", image: "⏰", category: "time", color: "aac-purple" },
  { id: "today", label: "today", image: "📅", category: "time", color: "aac-purple" },
  { id: "tomorrow", label: "tomorrow", image: "🌅", category: "time", color: "aac-purple" },
];

export const trainingPairs = [
  { input: "Me", output: ["want", "need", "go", "play"] },
  { input: "want", output: ["water", "food", "toy", "ball"] },
  { input: "go", output: ["home", "school", "park", "bathroom"] },
  { input: "play", output: ["ball", "toy"] },
  { input: "need", output: ["water", "food", "bathroom"] },
];
