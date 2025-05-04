import React from "react";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Share Your Culinary Creations
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover amazing recipes from around the world or share your own
          cooking masterpieces with our community.
        </p>
        <button className="bg-white text-primary font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 transition">
          Share Recipe
        </button>
      </div>
    </div>
  );
};

export default Banner;
