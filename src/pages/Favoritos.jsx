import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImBin } from 'react-icons/im';
import { toast } from 'react-toastify';

import './Favoritos.scss';

const Favoritos = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem('@animes');

    setAnimes(JSON.parse(myList) || []);
  }, []);

  const handleDeletion = (id) => {
    let animesFilter = animes.filter((item) => {
      return item.mal_id !== id;
    });

    setAnimes(animesFilter);

    localStorage.setItem('@animes', JSON.stringify(animesFilter));

    toast.success('anime removed successfully');
  };

  return (
    <section className="favorite">
      <div className="container">
        <div className="favorite-content">
          <h1>Meus Animes</h1>

          {animes.length === 0 && (
            <p className="favorite-msg">
              There are no saved animes at the moment.
            </p>
          )}

          <ul className="favorite-list">
            {animes.map((item) => {
              return (
                <li className="favorite-item" key={item.mal_id}>
                  <Link to={`/anime/${item.mal_id}`}>
                    <div className="favorite-image">
                      <img src={item.images.webp.image_url} alt={item.title} />
                    </div>
                    <span>{item.title}</span>
                  </Link>
                  <div className="favorite-btn-content">
                    <button onClick={() => handleDeletion(item.mal_id)}>
                      <span>Excluir</span>
                      <ImBin />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Favoritos;
