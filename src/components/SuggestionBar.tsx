
import React from "react";
import { CardSuggestion, CommunicationCard } from "@/types/aac";

interface SuggestionBarProps {
  suggestions: CardSuggestion[];
  onSelectSuggestion: (suggestion: CardSuggestion) => void;
  isLoading?: boolean;
}

const SuggestionBar: React.FC<SuggestionBarProps> = ({
  suggestions,
  onSelectSuggestion,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg">
        <div className="animate-pulse text-gray-500">Thinking...</div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No suggestions yet</p>
      </div>
    );
  }

  return (
    <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg overflow-x-auto">
      {suggestions.map((suggestion, index) => (
        <div
          key={`suggest-${index}`}
          onClick={() => onSelectSuggestion(suggestion)}
          className="flex-shrink-0 flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50"
        >
          <div className="text-3xl mb-1">{suggestion.image}</div>
          <p className="text-xs text-center">{suggestion.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SuggestionBar;
