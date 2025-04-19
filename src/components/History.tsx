
import React from 'react';
import { HistoryEntry } from '@/types/aac';
import { Volume2, Clock, History as HistoryIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryProps {
  entries: HistoryEntry[];
  onPhraseSelect: (phrase: string) => void;
}

const History: React.FC<HistoryProps> = ({ entries, onPhraseSelect }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <HistoryIcon size={16} />
          <span>View History</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Phrase History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {entries.length === 0 ? (
            <p className="text-gray-500 text-sm italic p-4">Your phrase history will appear here</p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-gray-50 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{format(new Date(entry.timestamp), 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {entry.cards.map((card, index) => (
                      <React.Fragment key={card.id}>
                        <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded">
                          <span className="text-xl">{card.image}</span>
                          <span className="text-xs text-gray-600">{card.label}</span>
                        </span>
                        {index < entry.cards.length - 1 && (
                          <span className="text-gray-400">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{entry.selectedPhrase}</p>
                    <button
                      onClick={() => onPhraseSelect(entry.selectedPhrase)}
                      className="inline-flex items-center gap-1 text-aac-teal hover:text-aac-teal/80 transition-colors text-sm"
                    >
                      <Volume2 size={14} />
                      <span>Speak</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default History;
