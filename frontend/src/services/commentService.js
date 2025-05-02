import axios from "axios";

const API_URL = "http://localhost:5000";

// Get all comments for a recipe
export const getCommentsByRecipe = async (recipeId) => {
  const response = await axios.get(`${API_URL}/comments?recipeId=${recipeId}`);
  return response.data;
};

// Add a new comment
export const addComment = async (commentData) => {
  const response = await axios.post(`${API_URL}/comments`, {
    ...commentData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};

// Update an existing comment
export const updateComment = async (id, content) => {
  const response = await axios.patch(`${API_URL}/comments/${id}`, {
    content,
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};

// Delete a comment
export const deleteComment = async (id) => {
  await axios.delete(`${API_URL}/comments/${id}`);
  return true;
};
