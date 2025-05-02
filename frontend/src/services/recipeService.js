import axios from "axios";

const API_URL = "http://localhost:5000";

// Get all recipes
export const getAllRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes`);
  return response.data;
};

// Get a specific recipe by ID
export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/recipes/${id}`);
  return response.data;
};

// Get recipes created by a specific user
export const getUserRecipes = async (userId) => {
  const response = await axios.get(`${API_URL}/recipes?userId=${userId}`);
  return response.data;
};

// Create a new recipe
export const createRecipe = async (recipeData) => {
  const response = await axios.post(`${API_URL}/recipes`, {
    ...recipeData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};

// Update an existing recipe
export const updateRecipe = async (id, recipeData) => {
  const response = await axios.patch(`${API_URL}/recipes/${id}`, {
    ...recipeData,
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  await axios.delete(`${API_URL}/recipes/${id}`);
  return true;
};

// Search recipes by title and/or category
export const searchRecipes = async (title, category) => {
  let url = `${API_URL}/recipes`;
  const params = [];

  if (title) params.push(`title_like=${title}`);
  if (category) params.push(`category=${category}`);

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await axios.get(url);
  return response.data;
};
