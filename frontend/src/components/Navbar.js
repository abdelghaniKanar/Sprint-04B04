import React from "react";

const Navbar = ({ user, onLoginClick, onRegisterClick, onLogout }) => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-primary text-2xl font-bold">CookShare</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {user ? (
            <>
              <span className="text-darkBg">Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                className="text-darkBg hover:text-primary transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="text-darkBg hover:text-primary transition"
              >
                Login
              </button>
              <button
                onClick={onRegisterClick}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
