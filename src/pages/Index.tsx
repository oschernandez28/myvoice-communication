import React, { useState, useEffect } from "react";
import { categories, communicationCards } from "@/data/cardData";
import CommunicationCard from "@/components/CommunicationCard";
import SuggestionBar from "@/components/SuggestionBar";
import MessageBar from "@/components/MessageBar";
import CategoryTabs from "@/components/CategoryTabs";
import { CommunicationCard as CardType, CardSuggestion } from "@/types/aac";
import { getPredictionService } from "@/services/predictionService";
import { getSpeechService } from "@/services/speechService";
import CollapsibleCardGroup from "@/components/CollapsibleCardGroup";

const Index = () => {
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [suggestions, setSuggestions] = useState<CardSuggestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'hierarchical' | 'flat'>('hierarchical');

  useEffect(() => {
    const initModel = async () => {
      const predictionService = getPredictionService();
      await predictionService.trainModel();
    };

    initModel().catch(console.error);
  }, []);

  useEffect(() => {
    updateSuggestions();
  }, [selectedCards]);

  const getMessageText = () => {
    return selectedCards.map(card => card.label).join(" ");
  };

  const updateSuggestions = async () => {
    if (selectedCards.length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      const predictionService = getPredictionService();
      
      const lastCard = selectedCards[selectedCards.length - 1];
      const inputText = lastCard.label;
      
      const newSuggestions = await predictionService.getSuggestions(inputText);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Failed to get suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (card: CardType) => {
    setSelectedCards([...selectedCards, card]);
  };

  const handleSuggestionClick = (suggestion: CardSuggestion) => {
    const card = communicationCards.find(c => c.label === suggestion.label);
    if (card) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleRemoveCard = (index: number) => {
    const updatedCards = [...selectedCards];
    updatedCards.splice(index, 1);
    setSelectedCards(updatedCards);
  };

  const handleClearAll = () => {
    setSelectedCards([]);
  };

  const handleSpeakMessage = (message: string) => {
    const speechService = getSpeechService();
    speechService.speak(message);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'hierarchical' ? 'flat' : 'hierarchical');
  };

  const cardsByCategory = categories.map(category => ({
    category,
    cards: communicationCards.filter(card => card.category === category.id)
  }));

  const filteredCards = selectedCategory 
    ? communicationCards.filter(card => card.category === selectedCategory)
    : communicationCards;

  return (
    <div className="min-h-screen bg-aac-background p-4 md:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-aac-purple">MyVoice</h1>
        <p className="text-center text-aac-text opacity-75">
          Communication Cards for Everyone
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        <section className="mb-4">
          <MessageBar 
            selectedCards={selectedCards}
            onRemoveCard={handleRemoveCard}
            onSpeakMessage={handleSpeakMessage}
            onClearAll={handleClearAll}
          />
        </section>

        <section className="mb-4">
          <h2 className="text-sm font-medium mb-2 text-aac-text">Suggestions</h2>
          <SuggestionBar 
            suggestions={suggestions} 
            onSelectSuggestion={handleSuggestionClick}
            isLoading={isLoading}
          />
        </section>

        <section className="mb-4 flex justify-end">
          <button 
            onClick={toggleViewMode}
            className="px-3 py-1 bg-aac-teal text-white rounded-md text-sm"
          >
            {viewMode === 'hierarchical' ? 'Switch to Flat View' : 'Switch to Categories'}
          </button>
        </section>

        {viewMode === 'hierarchical' ? (
          <section>
            <h2 className="text-sm font-medium mb-2 text-aac-text">Categories</h2>
            <div className="space-y-4">
              {cardsByCategory.map(({ category, cards }) => (
                <CollapsibleCardGroup
                  key={category.id}
                  category={category}
                  cards={cards}
                  onCardClick={handleCardClick}
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
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
