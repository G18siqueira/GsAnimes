import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Anime from './pages/Anime';
import ErrorPage from './pages/ErrorPage';
import Favoritos from './pages/Favoritos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },

      {
        path: '/animes',
        element: <Anime />,
      },
      {
        path: '/meus-animes',
        element: <Favoritos />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
