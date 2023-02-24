import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Anime from './pages/Anime';
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
        path: 'anime/:id',
        element: <Anime />,
      },
      {
        path: 'animes-favoritos',
        element: <Favoritos />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
