
import { CommunicationCard, CardCategory } from "@/types/aac";

export const categories: CardCategory[] = [
  { id: "needs", name: "I Need", color: "aac-blue" },
  { id: "wants", name: "I Want", color: "aac-green" },
  { id: "feelings", name: "I Feel", color: "aac-yellow" },
  { id: "actions", name: "Actions", color: "aac-purple" },
  { id: "places", name: "Places", color: "aac-orange" },
  { id: "people", name: "People", color: "aac-pink" },
];

export const communicationCards: CommunicationCard[] = [
  // Needs
  { id: "need-help", label: "I need help", image: "🆘", category: "needs", color: "aac-blue" },
  { id: "need-bathroom", label: "I need bathroom", image: "🚽", category: "needs", color: "aac-blue" },
  { id: "need-break", label: "I need a break", image: "⏸️", category: "needs", color: "aac-blue" },
  { id: "need-quiet", label: "I need quiet", image: "🤫", category: "needs", color: "aac-blue" },
  
  // Wants
  { id: "want-water", label: "I want water", image: "💧", category: "wants", color: "aac-green" },
  { id: "want-food", label: "I want food", image: "🍽️", category: "wants", color: "aac-green" },
  { id: "want-play", label: "I want to play", image: "⚽", category: "wants", color: "aac-green" },
  { id: "want-music", label: "I want music", image: "🎵", category: "wants", color: "aac-green" },
  { id: "want-book", label: "I want a book", image: "📚", category: "wants", color: "aac-green" },
  
  // Feelings
  { id: "feel-happy", label: "I feel happy", image: "😊", category: "feelings", color: "aac-yellow" },
  { id: "feel-sad", label: "I feel sad", image: "😢", category: "feelings", color: "aac-yellow" },
  { id: "feel-angry", label: "I feel angry", image: "😡", category: "feelings", color: "aac-yellow" },
  { id: "feel-tired", label: "I feel tired", image: "😴", category: "feelings", color: "aac-yellow" },
  { id: "feel-scared", label: "I feel scared", image: "😨", category: "feelings", color: "aac-yellow" },
  
  // Actions
  { id: "action-go", label: "Let's go", image: "🚶", category: "actions", color: "aac-purple" },
  { id: "action-stop", label: "Stop", image: "🛑", category: "actions", color: "aac-purple" },
  { id: "action-eat", label: "Let's eat", image: "🍴", category: "actions", color: "aac-purple" },
  { id: "action-play", label: "Let's play", image: "🎮", category: "actions", color: "aac-purple" },
  
  // Places
  { id: "place-home", label: "Go home", image: "🏠", category: "places", color: "aac-orange" },
  { id: "place-school", label: "Go to school", image: "🏫", category: "places", color: "aac-orange" },
  { id: "place-park", label: "Go to park", image: "🏞️", category: "places", color: "aac-orange" },
  { id: "place-store", label: "Go to store", image: "🏪", category: "places", color: "aac-orange" },
  
  // People
  { id: "person-mom", label: "Mom", image: "👩", category: "people", color: "aac-pink" },
  { id: "person-dad", label: "Dad", image: "👨", category: "people", color: "aac-pink" },
  { id: "person-teacher", label: "Teacher", image: "👩‍🏫", category: "people", color: "aac-pink" },
  { id: "person-friend", label: "Friend", image: "👫", category: "people", color: "aac-pink" },
];

// Training pairs for prediction model
export const trainingPairs = [
  { input: "I want", output: ["I want water", "I want to play", "I want food"] },
  { input: "I need", output: ["I need help", "I need bathroom", "I need a break"] },
  { input: "I feel", output: ["I feel happy", "I feel sad", "I feel tired"] },
  { input: "Let's", output: ["Let's go", "Let's play", "Let's eat"] },
  { input: "Go to", output: ["Go to park", "Go to school", "Go to store"] },
  { input: "I want to", output: ["I want to play"] },
  { input: "I need a", output: ["I need a break"] },
  { input: "Go", output: ["Go home", "Go to park", "Go to school"] },
];
