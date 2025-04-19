
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
    <Accordion type="single" collapsible className="mb-6">
      <AccordionItem value={category.id} className="border-none shadow-lg rounded-2xl overflow-hidden">
        <AccordionTrigger 
          className={cn(
            "p-6 w-full transition-all hover:no-underline",
            "hover:opacity-90 hover:brightness-95",
            getCategoryColorClass(category.color)
          )}
        >
          <div className="w-full flex items-center justify-between">
            <h3 className="text-2xl font-bold">{category.name}</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

