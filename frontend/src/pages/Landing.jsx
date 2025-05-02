import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import RegisterModal from "../components/auth/RegisterModal";
import LoginModal from "../components/auth/LoginModal";
import RecipeCard from "../components/recipes/RecipeCard";
import { useAuth } from "../contexts/AuthContext";
import { useRecipes } from "../contexts/RecipeContext";
import { getAllRecipes, searchRecipes } from "../services/recipeService";

const Landing = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { recipes, updateRecipes, categories } = useRecipes();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }

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
  }, [isAuthenticated, navigate, updateRecipes]);

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
      <div className="relative h-96 bg-recipe-beige">
        <div className="absolute inset-0 bg-gradient-to-r from-recipe-brown/20 to-transparent">
          <img
            src="/src/assets/banner-image.jpg"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-title font-bold text-white mb-4 shadow-text">
                Share Your Culinary Creations
              </h1>
              <p className="text-xl text-white mb-8 shadow-text">
                Join our community of food enthusiasts and discover amazing
                recipes from around the world.
              </p>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="px-6 py-3 bg-recipe-red text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition-colors"
              >
                Get Started
              </button>
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
              className="px-6 py-2 bg-recipe-red text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="container mx-auto px-4 py-12 flex-grow">
        <h2 className="text-3xl font-title font-bold text-recipe-brown text-center mb-10">
          Explore Popular Recipes
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recipe-red"></div>
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

      {/* Feature Section */}
      <div className="bg-recipe-beige py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-title font-bold text-recipe-brown text-center mb-12">
            Why Join Our Community?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-recipe-red mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-recipe-brown mb-2">
                Create and Share
              </h3>
              <p className="text-gray-600">
                Share your favorite recipes with our community and get feedback
                from food enthusiasts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-recipe-green mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-recipe-brown mb-2">
                Discover New Ideas
              </h3>
              <p className="text-gray-600">
                Find inspiration with recipes from different cuisines and skill
                levels for any occasion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-recipe-orange mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-recipe-brown mb-2">
                Connect with Others
              </h3>
              <p className="text-gray-600">
                Comment on recipes, exchange tips, and become part of our
                growing culinary community.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Landing;
