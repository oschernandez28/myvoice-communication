
import React from "react";
import { CommunicationCard } from "@/types/aac";
import { Button } from "@/components/ui/button";
import { X, Volume2, Trash2 } from "lucide-react";

interface MessageBarProps {
  selectedCards: CommunicationCard[];
  onRemoveCard: (index: number) => void;
  onSpeakMessage: () => void;
  onClearAll: () => void;
}

const MessageBar: React.FC<MessageBarProps> = ({
  selectedCards,
  onRemoveCard,
  onSpeakMessage,
  onClearAll
}) => {
  if (selectedCards.length === 0) {
    return (
      <div className="flex items-center justify-center h-16 bg-aac-background rounded-lg border border-aac-border">
        <p className="text-aac-text text-sm">Select words to build your message</p>
      </div>
    );
  }

  const renderBuiltPhrase = () => {
    return selectedCards.map(card => card.label).join(" ");
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="bg-white rounded-lg border border-aac-border p-4">
        <p className="text-lg font-medium mb-2">{renderBuiltPhrase()}</p>
        <div className="flex flex-wrap gap-2">
          {selectedCards.map((card, index) => (
            <div key={`${card.id}-${index}`} 
                 className="flex items-center bg-gray-100 rounded-md px-2 py-1">
              <span className="mr-1">{card.image}</span>
              <span className="text-sm">{card.label}</span>
              <button 
                onClick={() => onRemoveCard(index)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearAll}
          className="text-red-500 border-red-200 hover:bg-red-50"
        >
          <Trash2 size={16} className="mr-1" /> Clear
        </Button>
        <Button 
          onClick={onSpeakMessage} 
          size="sm"
          className="bg-aac-teal hover:bg-aac-blue text-white"
        >
          <Volume2 size={16} className="mr-1" /> Speak
        </Button>
      </div>
    </div>
  );
};

export default MessageBar;
