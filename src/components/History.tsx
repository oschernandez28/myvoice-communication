
import React from 'react';
import { HistoryEntry, CommunicationCard } from '@/types/aac';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from 'date-fns';

interface HistoryProps {
  entries: HistoryEntry[];
  onPhraseSelect: (phrase: string) => void;
}

const History: React.FC<HistoryProps> = ({ entries, onPhraseSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Phrase History</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500 text-sm">No phrases yet</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {entries.map((entry) => (
            <AccordionItem key={entry.id} value={entry.id}>
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">
                    {format(new Date(entry.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 py-2">
                  <div className="flex flex-wrap gap-2">
                    {entry.cards.map((card, idx) => (
                      <div
                        key={`${card.id}-${idx}`}
                        className="flex flex-col items-center bg-gray-100 rounded p-2"
                      >
                        <span className="text-2xl mb-1">{card.image}</span>
                        <span className="text-xs">{card.label}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => onPhraseSelect(entry.selectedPhrase)}
                    className="w-full text-left p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                  >
                    {entry.selectedPhrase}
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default History;
