
import React from 'react';
import { HistoryEntry } from '@/types/aac';
import { Volume2 } from 'lucide-react';
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
        <p className="text-gray-500 text-sm italic">Your phrase history will appear here</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {entries.map((entry) => (
            <AccordionItem key={entry.id} value={entry.id}>
              <AccordionTrigger className="text-sm py-3 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">Used cards:</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {entry.cards.map((card, index) => (
                        <React.Fragment key={card.id}>
                          <span className="inline-flex items-center gap-1">
                            <span className="text-xl">{card.image}</span>
                            <span className="text-xs text-gray-600">{card.label}</span>
                          </span>
                          {index < entry.cards.length - 1 && (
                            <span className="text-gray-400">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {format(new Date(entry.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 py-2">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-900 mb-1">Generated phrase:</p>
                    <p className="text-sm text-gray-700">{entry.selectedPhrase}</p>
                  </div>
                  <button
                    onClick={() => onPhraseSelect(entry.selectedPhrase)}
                    className="w-full text-left p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors text-sm flex items-center gap-1"
                  >
                    <Volume2 size={14} className="text-aac-teal" />
                    <span>Speak this phrase</span>
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
