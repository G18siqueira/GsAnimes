import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import api from '../services/api';
import Card from '../components/Card';

import './Top.scss';
import Pagination from '../components/Pagination';

const ismobile = window.innerWidth <= 768;

let LIMIT = 24;
if (ismobile) {
  LIMIT = 12;
}

const Season = () => {
  const [top, setTop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const loadTop = useCallback(async () => {
    try {
      const topResponse = await api.get(
        `top/anime?page=${page}&limit=${LIMIT}`,
      );

      if (topResponse.status === 200) {
        setTop(topResponse.data);
        setLoading(false);
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
  }, [page, LIMIT]);

  useEffect(() => {
    setPage(() => offset / LIMIT + 1);
  }, [offset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadTop();
    }, 1000); // espera 1 segundo antes de fazer a primeira requisição

    return () => clearTimeout(timeout); //evita que a função loadAnimesTop seja executada várias vezes em paralelo.
  }, [loadTop]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Top Animes</h2>
        <span>
          <AiOutlineLoading3Quarters />
        </span>
      </div>
    );
  }

  return (
    <section className="top">
      <div className="container">
        {top.data && (
          <div className="top-content">
            <h1 className="top-tit">Top Animes</h1>
            <p className="season-subtit">
              Here is a list of the most popular anime based on views of all
              time.
            </p>

            <div className="top-card-content">
              {top.data.map((top) => {
                return (
                  <Card
                    key={`top-${top.mal_id}`}
                    urlAnime={`/anime/${top.mal_id}`}
                    srcImage={top.images.jpg.image_url}
                    title={top.title}
                    japaneseTitle={top.title_japanese}
                  />
                );
              })}
            </div>
          </div>
        )}

        {top.pagination && (
          <Pagination
            limit={LIMIT}
            total={top.pagination.items.total}
            offset={offset}
            setOffset={setOffset}
            key={`pagination-${page}`}
          />
        )}
      </div>
    </section>
  );
};

export default Season;
