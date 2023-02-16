import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="error">
      <div className="container">
        <h1>Página de Erro</h1>
      </div>
    </section>
  );
};

export default ErrorPage;
