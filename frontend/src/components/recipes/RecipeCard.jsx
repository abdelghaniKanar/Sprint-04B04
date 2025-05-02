import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-recipe-card hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-title font-semibold text-recipe-brown text-lg truncate">
          {recipe.title}
        </h3>
        <Link
          to={`/recipe/${recipe.id}`}
          className="text-recipe-red hover:text-recipe-orange"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
      <div className="px-4 pb-4">
        <span className="inline-block bg-recipe-beige text-recipe-green text-sm px-3 py-1 rounded-full">
          {recipe.category}
        </span>
      </div>
    </div>
  );
};

export default RecipeCard;
