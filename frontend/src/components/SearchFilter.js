import React, { useState } from "react";

const SearchFilter = ({ onSearch, onCategoryFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Italian",
    "Indian",
    "Mexican",
    "Chinese",
    "Greek",
    "Russian",
    "Asian",
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onCategoryFilter(value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg py-6 px-4 md:px-8 -mt-8 mb-10 container mx-auto max-w-4xl">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by Title
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search for recipes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="md:w-1/3">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Category
          </label>
          <select
            id="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
