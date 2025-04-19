
import React from "react";
import { CardCategory, CommunicationCard } from "@/types/aac";
import CommunicationCardComponent from "@/components/CommunicationCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  // Get category color class
  const getCategoryColorClass = (color: string) => {
    if (color.startsWith('aac-')) {
      return `bg-${color} text-white`;
    }
    return "bg-gray-200 text-gray-800";
  };

  return (
    <Accordion type="single" collapsible className="mb-4">
      <AccordionItem value={category.id} className="border-none">
        <AccordionTrigger className={cn(
          "p-3 rounded-xl shadow-md",
          getCategoryColorClass(category.color)
        )}>
          <h3 className="text-xl font-medium">{category.name}</h3>
        </AccordionTrigger>
        <AccordionContent className="pt-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cards.map((card) => (
              <CommunicationCardComponent
                key={card.id}
                card={card}
                onClick={onCardClick}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CollapsibleCardGroup;

