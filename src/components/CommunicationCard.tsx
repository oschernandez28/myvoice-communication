
import React from "react";
import { CommunicationCard as CardType } from "@/types/aac";
import { cn } from "@/lib/utils";

interface CommunicationCardProps {
  card: CardType;
  onClick?: (card: CardType) => void;
  isSelected?: boolean;
  className?: string;
}

const CommunicationCard: React.FC<CommunicationCardProps> = ({
  card,
  onClick,
  isSelected = false,
  className
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(card);
    }
  };

  // Get color class based on card.color or category
  const getColorClass = () => {
    if (card.color?.startsWith('aac-')) {
      return `bg-${card.color} text-white`;
    }
    
    switch (card.category) {
      case "needs": return "bg-aac-blue text-white";
      case "wants": return "bg-aac-green text-white";
      case "feelings": return "bg-aac-yellow text-aac-text";
      case "actions": return "bg-aac-purple text-white";
      case "places": return "bg-aac-orange text-white";
      case "people": return "bg-aac-pink text-white";
      default: return "bg-aac-teal text-white";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-3 rounded-xl shadow-md cursor-pointer transition-transform transform hover:scale-105",
        getColorClass(),
        isSelected && "ring-4 ring-black ring-opacity-50 scale-105",
        className
      )}
      onClick={handleClick}
      aria-label={card.label}
    >
      <div className="text-4xl mb-2">{card.image}</div>
      <p className="text-center font-medium text-sm">{card.label}</p>
    </div>
  );
};

export default CommunicationCard;
