import { useRouteError, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

import './ErrorPage.scss';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />

      <main>
        <section className="error">
          <div className="container">
            <div className="error-content">
              <h1>404</h1>
              <h2>Página não encontrada!</h2>
              <Link className="error-btn" to="/">
                Veja todos os filmes
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ErrorPage;
