
import React from "react";
import { CardCategory } from "@/types/aac";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: CardCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  // Get color class for a category
  const getColorClass = (categoryColor: string) => {
    if (categoryColor.startsWith('aac-')) {
      return `bg-${categoryColor}/20 text-${categoryColor} border-${categoryColor}`;
    }
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Get active color class for a category
  const getActiveColorClass = (categoryColor: string) => {
    if (categoryColor.startsWith('aac-')) {
      return `bg-${categoryColor} text-white border-${categoryColor}`;
    }
    return "bg-gray-800 text-white border-gray-800";
  };

  return (
    <div className="flex overflow-x-auto py-2 space-x-2">
      <button
        className={cn(
          "flex-shrink-0 px-4 py-2 rounded-full border-2 transition-colors",
          selectedCategory === null 
            ? "bg-aac-purple text-white border-aac-purple" 
            : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
        )}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full border-2 transition-colors",
            selectedCategory === category.id
              ? getActiveColorClass(category.color)
              : `${getColorClass(category.color)} hover:bg-gray-200`
          )}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
