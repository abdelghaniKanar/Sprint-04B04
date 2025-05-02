import axios from "axios";

const API_URL = "http://localhost:5000";

// Register a new user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

// Login a user
export const loginUser = async (credentials) => {
  const { email, password } = credentials;
  const response = await axios.get(`${API_URL}/users?email=${email}`);
  const user = response.data[0];

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }

  return user;
};

// Update user details
export const updateUser = async (userId, userData) => {
  const response = await axios.patch(`${API_URL}/users/${userId}`, userData);
  return response.data;
};

// Delete a user account
export const deleteUser = async (userId) => {
  await axios.delete(`${API_URL}/users/${userId}`);
  return true;
};
