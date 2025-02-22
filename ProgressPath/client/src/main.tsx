import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx';
import ErrorPage from './pages/Error';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Pathboard from './pages/Pathboard.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path: '/pathboard',
        element: <Pathboard />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
