import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import Card from '../components/Card';
import Pagination from '../components/Pagination';

import api from '../services/api';

import './Busca.scss';

const ismobile = window.innerWidth <= 768;

let LIMIT = 20;
if (ismobile) {
  LIMIT = 10;
}

const Busca = () => {
  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const navigation = useNavigate();

  const loadAnimes = useCallback(async () => {
    try {
      const animesResponse = await api.get(
        `anime?q=${query}&page=${page}&limit=${LIMIT}`,
      );

      if (animesResponse.status === 200) {
        setAnimes(animesResponse.data);
      }
    } catch (error) {
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
  }, [query, page, LIMIT]);

  useEffect(() => {
    setPage(() => offset / LIMIT + 1);
  }, [offset]);

  useEffect(() => {
    loadAnimes();
  }, [loadAnimes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    navigation(`/animes?q=${search}`);
    setSearch('');
    setOffset(0);
    setPage(1);
  };

  return (
    <section className="search">
      <div className="container">
        {animes ? (
          <div className="search-content">
            <h1 className="search-tit">Search for an anime!</h1>
            <p className="season-subtit">
              Search here for the anime you are looking for!
            </p>

            <div className="search-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search by name"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />

                <button type="submit">
                  <FiSearch />
                </button>
              </form>
            </div>

            {/* {animes.pagination && (
            <div>
              <h2 className="search-nome">
                current page: {animes.pagination.current_page}
              </h2>
              <h3>
                <span>
                  {query}/{`page: ${page}`}
                </span>
              </h3>
              <h4>{`offset: ${offset}`}</h4>
              <h4>{`Limit: ${LIMIT}`}</h4>
            </div>
          )} */}

            {animes.data && (
              <div className="search-card-content">
                {animes.data.map((anime) => {
                  return (
                    <Card
                      urlAnime={`/anime/${anime.mal_id}`}
                      key={anime.mal_id}
                      srcImage={anime.images.jpg.image_url}
                      title={anime.title}
                      japaneseTitle={anime.title_japanese}
                    />
                  );
                })}
              </div>
            )}

            {animes.pagination && (
              <Pagination
                limit={LIMIT}
                total={animes.pagination.items.total}
                offset={offset}
                setOffset={setOffset}
                key={`pagination-${page}`}
              />
            )}
          </div>
        ) : (
          <div className="loading">
            <h2>Loading content...</h2>
            <span>
              <AiOutlineLoading3Quarters />
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Busca;
