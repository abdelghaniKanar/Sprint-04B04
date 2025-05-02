import { createContext, useContext, useState } from "react";

// Create context
const RecipeContext = createContext();

// Context provider
export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Function to update recipes
  const updateRecipes = (newRecipes) => {
    setRecipes(newRecipes);

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(newRecipes.map((recipe) => recipe.category)),
    ];
    setCategories(uniqueCategories);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        updateRecipes,
        loading,
        setLoading,
        error,
        setError,
        categories,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

// Custom hook for using the recipe context
export const useRecipes = () => useContext(RecipeContext);
