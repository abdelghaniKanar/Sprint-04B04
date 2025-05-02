// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import { RecipeProvider } from "./contexts/RecipeContext";
// import { useAuth } from "./contexts/AuthContext";

// // Import pages (we'll create these next)
// // Placeholder imports for now
// const Landing = () => <div>Landing Page</div>;
// const Home = () => <div className="text-center">Home Page</div>;
// const RecipeDetail = () => <div>Recipe Detail Page</div>;
// const Dashboard = () => <div>Dashboard</div>;
// const MyRecipes = () => <div>My Recipes</div>;
// const AddRecipe = () => <div>Add Recipe</div>;
// const Profile = () => <div>Profile</div>;

// // Protected route component
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// // Guest route (redirect if logged in)
// const GuestRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (isAuthenticated) {
//     return <Navigate to="/home" />;
//   }

//   return children;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <RecipeProvider>
//         <Router>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <GuestRoute>
//                   <Landing />
//                 </GuestRoute>
//               }
//             />
//             <Route path="/home" element={<Home />} />
//             <Route path="/recipe/:id" element={<RecipeDetail />} />
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             >
//               <Route
//                 index
//                 element={<Navigate to="/dashboard/my-recipes" replace />}
//               />
//               <Route path="my-recipes" element={<MyRecipes />} />
//               <Route path="add-recipe" element={<AddRecipe />} />
//               <Route path="profile" element={<Profile />} />
//             </Route>
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </Router>
//       </RecipeProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RecipeProvider } from "./contexts/RecipeContext";
import { useAuth } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recipe-red"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

// Guest route (redirect if logged in)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recipe-red"></div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/home" /> : children;
};

// The main app component with context providers
const AppWrapper = () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <AppRoutes />
      </RecipeProvider>
    </AuthProvider>
  );
};

// The routes component that uses the context
const AppRoutes = () => {
  return (
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
        {/* Placeholder routes for now */}
        <Route
          path="/recipe/:id"
          element={<div>Recipe Detail (Coming Soon)</div>}
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <div>Dashboard (Coming Soon)</div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppWrapper;
