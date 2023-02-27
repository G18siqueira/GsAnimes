import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import {} from 'react-icons/ai';
import { toast } from 'react-toastify';

import api from '../services/api';

import './Anime.scss';

const Anime = () => {
  const { id } = useParams();

  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  const loadAnime = useCallback(async () => {
    try {
      const [animeResponse] = await Promise.all([api.get(`anime/${id}/full`)]);

      if (animeResponse.status === 200) {
        setAnime(animeResponse.data.data);
        setLoading(false);
      }
    } catch (error) {
      navigation('/', { replace: true });

      if (error.response) {
        const { status } = error.response;

        switch (status) {
          case 400:
            console.log('Bad request');
            break;
          case 401:
            console.log('Unauthorized');
            break;
          case 403:
            console.log('Forbidden');
            break;
          case 404:
            console.log('Not found');
            break;
          case 500:
            console.log('Internal server error');
            break;
          default:
            console.log('Unknown error');
            break;
        }
      } else if (error.request) {
        console.log('No response from server');
      } else {
        console.log('Error', error.message);
      }
    }
  }, [id, navigation]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadAnime();
    }, 1000); // espera 1 segundo antes de fazer a primeira requisição

    return () => clearTimeout(timeout); //evita que a função loadAnimesTop seja executada várias vezes em paralelo.
  }, [loadAnime]);

  const favoriteAnime = () => {
    const myList = localStorage.getItem('@animes');
    let savedAnimes = JSON.parse(myList) || [];
    const hasAnime = savedAnimes.some(
      (savedAnime) => savedAnime.mal_id === anime.mal_id,
    );

    if (hasAnime) {
      toast.warn('This anime is already on the list!');
      return;
    }

    savedAnimes = [...savedAnimes, anime];
    localStorage.setItem('@animes', JSON.stringify(savedAnimes));
    toast.success('Anime successfully saved');
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Anime Information...</h2>
        <span>
          <AiOutlineLoading3Quarters />
        </span>
      </div>
    );
  }

  return (
    <section className="anime">
      <div className="container">
        <div className="anime-content">
          <div className="anime-title">
            <h1>{anime.title}</h1>
            <p>({anime.title_japanese})</p>
          </div>

          <div className="anime-trailer">
            {anime.trailer.embed_url === null ? (
              <div className="notTrailer">
                <img
                  src={anime.images.webp.large_image_url}
                  alt={anime.title}
                />
                <p>This anime has no trailer...</p>
              </div>
            ) : (
              <iframe src={anime.trailer.embed_url}></iframe>
            )}
          </div>

          <div className="anime-intro">
            <div className="imagem">
              <img src={anime.images.webp.image_url} alt={anime.title} />
            </div>

            <div className="infos">
              <ul>
                <li>
                  <h3>Studios:</h3>
                  <p>
                    {anime.studios
                      .map((studio) => {
                        return <span key={studio.mal_id}>{studio.name} </span>;
                      })
                      .reduce((prev, curr) => [prev, ' | ', curr])}
                  </p>
                </li>

                <li>
                  <h3>Episodes:</h3>
                  <p>{anime.episodes}</p>
                </li>

                <li>
                  <h3>Duration:</h3>
                  <p>{anime.duration}</p>
                </li>

                <li>
                  <h3>Status:</h3>
                  <p>{anime.status}</p>
                </li>

                <li>
                  <h3>Genres:</h3>
                  <p>
                    {anime.genres
                      .map((genero) => (
                        <span key={genero.mal_id}>{genero.name}</span>
                      ))
                      .reduce((prev, curr) => [prev, ' | ', curr])}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="anime-favoritar">
            <button onClick={favoriteAnime} className="btn-fav">
              <AiOutlineHeart /> <span>Favoritar</span>
            </button>
          </div>

          <div className="anime-sinopse">
            <h3>Sypnosis :</h3>
            <p>{anime.synopsis}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Anime;
