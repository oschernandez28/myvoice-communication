export interface CommunicationCard {
  id: string;
  label: string;
  image: string; // Can be an emoji, icon name, or image URL
  category?: string;
  color?: string;
  subcategory?: string; // Optional subcategory for deeper nesting
  isExpandable?: boolean; // Indicates if this card expands to show more options
  parentId?: string; // Optional reference to parent card if part of a hierarchy
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

export interface HistoryEntry {
  id: string;
  timestamp: Date;
  cards: CommunicationCard[];
  selectedPhrase: string;
}
