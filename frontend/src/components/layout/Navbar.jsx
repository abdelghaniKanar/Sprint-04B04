import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const Navbar = ({ onRegisterClick, onLoginClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine which links to show based on current location
  const renderLinks = () => {
    if (location.pathname === "/") {
      // Landing page - show register/login
      return (
        <>
          <button
            onClick={onRegisterClick}
            className="px-4 py-2 text-recipe-red border border-recipe-red rounded-md hover:bg-recipe-red hover:text-white transition-colors"
          >
            Register
          </button>
          <button
            onClick={onLoginClick}
            className="px-4 py-2 ml-2 bg-recipe-red text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Login
          </button>
        </>
      );
    }

    if (location.pathname.startsWith("/dashboard")) {
      // Dashboard - show only home link
      return (
        <Link
          to="/home"
          className="text-recipe-brown hover:text-recipe-red transition-colors"
        >
          Home
        </Link>
      );
    }

    if (location.pathname.startsWith("/recipe/")) {
      // Recipe detail - show home and username if authenticated
      return (
        <div className="flex items-center gap-4">
          <Link
            to="/home"
            className="text-recipe-brown hover:text-recipe-red transition-colors"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-recipe-brown hover:text-recipe-red transition-colors"
            >
              {user.username}
            </Link>
          )}
        </div>
      );
    }

    // Home page (authenticated or not)
    return (
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="font-medium text-lime-950 hover:text-lime-950 transition-colors"
          >
            {user.username}
          </Link>
        ) : (
          <>
            <button
              onClick={onRegisterClick}
              className="px-4 py-2 text-recipe-red border border-recipe-red rounded-md hover:bg-recipe-red hover:text-white transition-colors"
            >
              Register
            </button>
            <button
              onClick={onLoginClick}
              className="px-4 py-2 ml-2 bg-recipe-red text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Login
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to={isAuthenticated ? "/home" : "/"}
              className="flex items-center"
            >
              <span className="text-2xl font-bold text-lime-950">
                RecipeShare
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center">{renderLinks()}</div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-recipe-brown hover:text-recipe-red hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-recipe-brown hover:text-recipe-red hover:bg-gray-50"
              >
                {user.username}
              </Link>
            )}
            <Link
              to={isAuthenticated ? "/home" : "/"}
              className="block px-3 py-2 rounded-md text-base font-medium text-recipe-brown hover:text-recipe-red hover:bg-gray-50"
            >
              Home
            </Link>
            {!isAuthenticated && location.pathname !== "/" && (
              <>
                <button
                  onClick={onRegisterClick}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-recipe-brown hover:text-recipe-red hover:bg-gray-50"
                >
                  Register
                </button>
                <button
                  onClick={onLoginClick}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-recipe-brown hover:text-recipe-red hover:bg-gray-50"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
