
import React, { useState, useEffect } from "react";
import { getSpeechService } from "@/services/speechService";
import { useCardSelection } from "@/hooks/useCardSelection";
import { CardDisplay } from "@/components/CardDisplay";
import SuggestionBar from "@/components/SuggestionBar";
import MessageBar from "@/components/MessageBar";
import History from "@/components/History";
import { DarkModeToggle } from "@/components/DarkModeToggle";
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
    // Log the selected voice when component mounts
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
    <div className="min-h-screen bg-aac-background dark:bg-gray-900 p-4 md:p-8">
      <header className="mb-6 flex items-center justify-center relative">
        <div className="absolute left-8 top-0">
          <DarkModeToggle />
        </div>
        <div className="flex-grow text-center">
          <h1 className="text-3xl font-bold text-aac-purple dark:text-aac-blue">MyVoice</h1>
          <p className="text-center text-aac-text dark:text-gray-300 opacity-75">
            Communication Cards for Everyone
          </p>
        </div>
        <div className="absolute right-8 top-0">
          <History 
            entries={history} 
            onPhraseSelect={handleSpeakMessage}
          />
        </div>
      </header>

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
          <h2 className="text-sm font-medium mb-2 text-aac-text dark:text-gray-300">Suggestions</h2>
          <SuggestionBar 
            suggestions={suggestions} 
            onSelectSuggestion={handleCardClick}
            isLoading={isLoading}
          />
        </section>

        <CardDisplay onCardClick={handleCardClick} />
      </div>
    </div>
  );
};

export default Index;
