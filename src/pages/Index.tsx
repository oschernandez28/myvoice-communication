
import React, { useState, useEffect } from "react";
import { getSpeechService } from "@/services/speechService";
import { useCardSelection } from "@/hooks/useCardSelection";
import { CardDisplay } from "@/components/CardDisplay";
import SuggestionBar from "@/components/SuggestionBar";
import MessageBar from "@/components/MessageBar";
import History from "@/components/History";
import Navbar from "@/components/Navbar";
import { HistoryEntry } from "@/types/aac";

const Index = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const {
    selectedCards,
    suggestions,
    isLoading,
    handleCardClick,
    handleRemoveCard,
    handleClearAll,
  } = useCardSelection();
  
  // Create a single instance of the speech service
  const speechService = getSpeechService();

  useEffect(() => {
    // Log the current voice when component mounts
    console.log("Current voice:", speechService.getCurrentVoice()?.name);
  }, []);

  const handleSpeakMessage = (message: string) => {
    speechService.speak(message);
  };

  const handleSaveHistory = (phrase: string) => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      cards: [...selectedCards],
      selectedPhrase: phrase
    };
    setHistory(prevHistory => [newEntry, ...prevHistory]);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-aac-background p-4 md:p-8 pt-32">
        <div className="absolute right-8 top-36 md:top-40">
          <History 
            entries={history} 
            onPhraseSelect={handleSpeakMessage}
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <section className="mb-4">
            <MessageBar 
              selectedCards={selectedCards}
              onRemoveCard={handleRemoveCard}
              onSpeakMessage={handleSpeakMessage}
              onClearAll={handleClearAll}
              onSaveHistory={handleSaveHistory}
            />
          </section>

          <section className="mb-4">
            <h2 className="text-sm font-medium mb-2 text-aac-text">Suggestions</h2>
            <SuggestionBar 
              suggestions={suggestions} 
              onSelectSuggestion={handleCardClick}
              isLoading={isLoading}
            />
          </section>

          <CardDisplay onCardClick={handleCardClick} />
        </div>
      </div>
    </>
  );
};

export default Index;
