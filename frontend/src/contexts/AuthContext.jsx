import { createContext, useContext, useReducer, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

// Reducer function
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

// Context provider
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is stored in localStorage
    const checkUser = () => {
      const user = localStorage.getItem("user");
      if (user) {
        dispatch({ type: "LOGIN", payload: JSON.parse(user) });
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    checkUser();
  }, []);

  // Auth methods
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);
