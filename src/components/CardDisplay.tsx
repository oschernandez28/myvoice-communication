
import React, { useState } from "react";
import { categories, communicationCards } from "@/data/cardData";
import CommunicationCard from "@/components/CommunicationCard";
import CategoryTabs from "@/components/CategoryTabs";
import CollapsibleCardGroup from "@/components/CollapsibleCardGroup";
import { CommunicationCard as CardType } from "@/types/aac";

interface CardDisplayProps {
  onCardClick: (card: CardType) => void;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({ onCardClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'hierarchical' | 'flat'>('hierarchical');

  const cardsByCategory = categories.map(category => ({
    category,
    cards: communicationCards.filter(card => card.category === category.id)
  }));

  const filteredCards = selectedCategory 
    ? communicationCards.filter(card => card.category === selectedCategory)
    : communicationCards;

  return (
    <div className="space-y-6">
      <button 
        onClick={() => setViewMode(viewMode === 'hierarchical' ? 'flat' : 'hierarchical')}
        className="px-3 py-1 bg-aac-teal text-white rounded-md text-sm"
      >
        {viewMode === 'hierarchical' ? 'Switch to Flat View' : 'Switch to Categories'}
      </button>

      {viewMode === 'hierarchical' ? (
        <section>
          <h2 className="text-sm font-medium mb-2 text-aac-text">Categories</h2>
          <div className="space-y-4">
            {cardsByCategory.map(({ category, cards }) => (
              <CollapsibleCardGroup
                key={category.id}
                category={category}
                cards={cards}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="mb-4">
            <h2 className="text-sm font-medium mb-2 text-aac-text">Categories</h2>
            <CategoryTabs 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </section>

          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredCards.map((card) => (
                <CommunicationCard
                  key={card.id}
                  card={card}
                  onClick={onCardClick}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
