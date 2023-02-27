import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import api from '../services/api';
import Card from '../components/Card';

import './Season.scss';
import Pagination from '../components/Pagination';

const ismobile = window.innerWidth <= 768;

let LIMIT = 24;
if (ismobile) {
  LIMIT = 12;
}

const Season = () => {
  const { nameSeason } = useParams();
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const loadSeason = useCallback(async () => {
    try {
      const seasonResponse = await api.get(
        `/seasons/${nameSeason}?page=${page}&limit=${LIMIT}`,
      );

      if (seasonResponse.status === 200) {
        setSeason(seasonResponse.data);
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
  }, [nameSeason, page, LIMIT]);

  useEffect(() => {
    setPage(() => offset / LIMIT + 1);
  }, [offset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadSeason();
    }, 1000); // espera 1 segundo antes de fazer a primeira requisição

    return () => clearTimeout(timeout); //evita que a função loadAnimesTop seja executada várias vezes em paralelo.
  }, [loadSeason]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Seasons</h2>
        <span>
          <AiOutlineLoading3Quarters />
        </span>
      </div>
    );
  }

  return (
    <section className="season">
      <div className="container">
        {season.data && (
          <div className="season-content">
            <h1 className="season-tit">Season {nameSeason}</h1>

            {nameSeason === 'now' ? (
              <p className="season-subtit">
                See the anime of the current season!
              </p>
            ) : (
              <p className="season-subtit">
                Find out which animes will come in the next seasons!
              </p>
            )}

            <div className="season-card-content">
              {season.data.map((season) => {
                return (
                  <Card
                    key={`season-${season.mal_id}`}
                    urlAnime={`/anime/${season.mal_id}`}
                    srcImage={season.images.jpg.image_url}
                    title={season.title}
                    japaneseTitle={season.title_japanese}
                  />
                );
              })}
            </div>
          </div>
        )}

        {season.pagination && (
          <Pagination
            limit={LIMIT}
            total={season.pagination.items.total}
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
