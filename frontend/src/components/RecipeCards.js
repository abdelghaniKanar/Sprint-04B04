import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeCards = ({ recipes }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Recipes</h2>
      {recipes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No recipes found. Try changing your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeCards;
