
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CardCategory, CommunicationCard } from "@/types/aac";
import CommunicationCard as CardComponent from "@/components/CommunicationCard";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleCardGroupProps {
  category: CardCategory;
  cards: CommunicationCard[];
  onCardClick: (card: CommunicationCard) => void;
}

const CollapsibleCardGroup: React.FC<CollapsibleCardGroupProps> = ({
  category,
  cards,
  onCardClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get category color class
  const getCategoryColorClass = (color: string) => {
    if (color.startsWith('aac-')) {
      return `bg-${color} text-white`;
    }
    return "bg-gray-200 text-gray-800";
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
      <CollapsibleTrigger className={cn(
        "w-full flex items-center justify-between p-3 rounded-xl shadow-md cursor-pointer",
        getCategoryColorClass(category.color)
      )}>
        <div className="flex items-center">
          <h3 className="text-xl font-medium">{category.name}</h3>
        </div>
        {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pt-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cards.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              onClick={onCardClick}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleCardGroup;
