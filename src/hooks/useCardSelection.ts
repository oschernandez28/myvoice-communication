
import { useState, useEffect } from "react";
import { CommunicationCard, CardSuggestion } from "@/types/aac";
import { getPredictionService } from "@/services/predictionService";

export const useCardSelection = () => {
  const [selectedCards, setSelectedCards] = useState<CommunicationCard[]>([]);
  const [suggestions, setSuggestions] = useState<CardSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCardClick = (card: CommunicationCard) => {
    setSelectedCards([...selectedCards, card]);
  };

  const handleRemoveCard = (index: number) => {
    const updatedCards = [...selectedCards];
    updatedCards.splice(index, 1);
    setSelectedCards(updatedCards);
  };

  const handleClearAll = () => {
    setSelectedCards([]);
  };

  return {
    selectedCards,
    suggestions,
    isLoading,
    handleCardClick,
    handleRemoveCard,
    handleClearAll,
  };
};
