import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
          <span className="bg-primary text-white text-xs px-2 py-1 rounded">
            {recipe.category}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="mr-4">{recipe.prepTime}</span>
          <span>{recipe.difficulty}</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="text-yellow-400">
            {"★".repeat(Math.floor(recipe.rating))}
            {"☆".repeat(5 - Math.floor(recipe.rating))}
          </div>
          <span className="ml-1 text-sm text-gray-600">{recipe.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
