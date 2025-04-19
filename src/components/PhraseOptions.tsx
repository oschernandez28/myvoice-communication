
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface PhraseOptionsProps {
  isOpen: boolean;
  options: string[];
  onSelect: (phrase: string) => void;
  onClose: () => void;
}

const PhraseOptions: React.FC<PhraseOptionsProps> = ({
  isOpen,
  options,
  onSelect,
  onClose
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[300px]">
        <SheetHeader>
          <SheetTitle>Choose a phrase</SheetTitle>
          <SheetDescription>
            Select one of the following options to speak
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full text-left justify-start h-auto p-4 whitespace-normal"
              onClick={() => onSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PhraseOptions;
