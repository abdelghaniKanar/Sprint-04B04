import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import RecipeCard from "../components/recipes/RecipeCard";
import { useRecipes } from "../contexts/RecipeContext";
import { getAllRecipes, searchRecipes } from "../services/recipeService";

const Home = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { recipes, updateRecipes, loading, setLoading, categories } =
    useRecipes();

  useEffect(() => {
    // Load recipes
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const data = await getAllRecipes();
        updateRecipes(data);
      } catch (error) {
        console.error("Failed to load recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [setLoading, updateRecipes]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const results = await searchRecipes(searchTitle, selectedCategory);
      updateRecipes(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        onRegisterClick={() => setShowRegisterModal(true)}
        onLoginClick={() => setShowLoginModal(true)}
      />

      {/* Hero Banner */}
      <div className="relative h-72 bg-recipe-beige">
        <div className="absolute inset-0 bg-gradient-to-r from-recipe-brown/20 to-transparent blur-sm">
          <img
            src="/src/assets/banner-image.jpg"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-4xl font-title font-bold text-white mb-4 text-lime-950">
                Find Your Next Culinary Adventure
              </h1>
              <p className="text-lg text-white text-lime-950">
                Browse recipes or share your own creations with our community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search recipes..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-red"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-red"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-lime-700 text-white font-semibold rounded-md hover:bg-lime-950 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="container mx-auto px-4 py-12 flex-grow">
        <h2 className="text-3xl font-title font-bold text-lime-950 text-center mb-10">
          Discover Recipes
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-950"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">
                  No recipes found. Try different search criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
