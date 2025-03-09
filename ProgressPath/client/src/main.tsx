import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import App from "./App";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Pathboard from "./pages/Pathboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthService from "./utils/auth";

// 🔒 Protected Route Wrapper
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return AuthService.loggedIn() ? element : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />, // Always show Home page at `/`
      },
      {
        path: "/home",
        element: <Home />, // Explicit route for `/home`
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: "/pathboard",
        element: <ProtectedRoute element={<Pathboard />} />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
