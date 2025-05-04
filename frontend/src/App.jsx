import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import SearchFilter from "./components/SearchFilter";
import RecipeCards from "./components/RecipeCards";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

// Static recipe data
const RECIPE_DATA = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    category: "Italian",
    image: "https://source.unsplash.com/300x200/?pasta",
    prepTime: "25 mins",
    difficulty: "Medium",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Beef Stroganoff",
    category: "Russian",
    image: "https://source.unsplash.com/300x200/?beef",
    prepTime: "40 mins",
    difficulty: "Medium",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Chicken Curry",
    category: "Indian",
    image: "https://source.unsplash.com/300x200/?curry",
    prepTime: "35 mins",
    difficulty: "Medium",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Greek Salad",
    category: "Greek",
    image: "https://source.unsplash.com/300x200/?salad",
    prepTime: "15 mins",
    difficulty: "Easy",
    rating: 4.3,
  },
  {
    id: 5,
    title: "Beef Tacos",
    category: "Mexican",
    image: "https://source.unsplash.com/300x200/?tacos",
    prepTime: "30 mins",
    difficulty: "Easy",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Vegetable Stir Fry",
    category: "Asian",
    image: "https://source.unsplash.com/300x200/?stirfry",
    prepTime: "20 mins",
    difficulty: "Easy",
    rating: 4.4,
  },
];

function App() {
  const [recipes, setRecipes] = useState(RECIPE_DATA);
  const [filteredRecipes, setFilteredRecipes] = useState(RECIPE_DATA);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState(null);

  // Search handler
  const handleSearch = (term) => {
    if (!term) {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  // Category filter handler
  const handleCategoryFilter = (category) => {
    if (!category || category === "All") {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter((recipe) => recipe.category === category);
    setFilteredRecipes(filtered);
  };

  // Login handler
  const handleLogin = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  // Register handler
  const handleRegister = (userData) => {
    setUser(userData);
    setShowRegisterModal(false);
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onLogout={handleLogout}
      />
      <Banner />
      <main className="flex-grow">
        <SearchFilter
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
        />
        <RecipeCards recipes={filteredRecipes} />
      </main>
      <Footer />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onRegisterClick={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onRegister={handleRegister}
          onLoginClick={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
