import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Anime from './pages/Anime';
import Favoritos from './pages/Favoritos';
import Busca from './pages/Busca';
import Season from './pages/Season';
import Top from './pages/Top';

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
        path: 'top/anime',
        element: <Top />,
      },
      {
        path: 'seasons/:nameSeason',
        element: <Season />,
      },
      {
        path: 'animes',
        element: <Busca />,
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
