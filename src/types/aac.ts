
export interface CommunicationCard {
  id: string;
  label: string;
  image: string; // Can be an emoji, icon name, or image URL
  category?: string;
  color?: string;
}

export interface CardSuggestion {
  label: string;
  image: string;
}

export interface CardCategory {
  id: string;
  name: string;
  color: string;
}
