import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RecipeProvider } from "./contexts/RecipeContext";
import { useAuth } from "./contexts/AuthContext";

// Import pages (we'll create these next)
// Placeholder imports for now
const Landing = () => <div>Landing Page</div>;
const Home = () => <div className="text-center">Home Page</div>;
const RecipeDetail = () => <div>Recipe Detail Page</div>;
const Dashboard = () => <div>Dashboard</div>;
const MyRecipes = () => <div>My Recipes</div>;
const AddRecipe = () => <div>Add Recipe</div>;
const Profile = () => <div>Profile</div>;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

// Guest route (redirect if logged in)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <GuestRoute>
                  <Landing />
                </GuestRoute>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="/dashboard/my-recipes" replace />}
              />
              <Route path="my-recipes" element={<MyRecipes />} />
              <Route path="add-recipe" element={<AddRecipe />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
