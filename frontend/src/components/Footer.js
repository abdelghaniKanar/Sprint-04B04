import React from "react";

const Footer = () => {
  return (
    <footer className="bg-darkBg text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">CookShare</h3>
            <p className="text-gray-300">
              Share your culinary creations with the world and discover amazing
              recipes from our community.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition"
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary transition"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition">
                Facebook
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                Twitter
              </a>
              <a href="#" className="text-white hover:text-primary transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} CookShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
