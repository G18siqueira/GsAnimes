import { useEffect, useState, useCallback } from 'react';

import { Link } from 'react-router-dom';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import api from '../services/api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import './Home.scss';

const Home = () => {
  const [animesTop, setAnimesTop] = useState([]);
  const [animesSeason, setAnimesSeason] = useState([]);
  const [upcomingSeason, setUpcomingSeason] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAnimesTop = useCallback(async () => {
    try {
      const [topResponse, seasonsResponse, upcomingResponse] =
        await Promise.all([
          api.get('top/anime'),
          api.get('seasons/now'),
          api.get('seasons/upcoming'),
        ]);

      if (topResponse.status === 200) {
        setAnimesTop(topResponse.data.data.slice(0, 5));
      }

      if (seasonsResponse.status === 200) {
        setAnimesSeason(seasonsResponse.data.data.slice(0, 10));
      }

      if (upcomingResponse.status === 200) {
        setUpcomingSeason(upcomingResponse.data.data.slice(0, 10));
      }

      setLoading(false);
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
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadAnimesTop();
    }, 1000); // espera 1 segundo antes de fazer a primeira requisição

    return () => clearTimeout(timeout); //evita que a função loadAnimesTop seja executada várias vezes em paralelo.
  }, [loadAnimesTop]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Page Sessions...</h2>
        <span>
          <AiOutlineLoading3Quarters />
        </span>
      </div>
    );
  }

  return (
    <section className="home">
      <div className="container">
        {}
        {/* EXPLORE */}
        <div className="home-explore">
          <div className="home-explore-intro">
            <h2 className="home-title">Explore</h2>
            <p className="home-subtitle">What are you gonna watch today ?</p>
          </div>

          <div className="home-explore-banner">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {animesTop.map((anime) => {
                return (
                  <SwiperSlide key={anime.mal_id}>
                    <Link to={`/anime/${anime.mal_id}`}>
                      <div className="imagem">
                        <img src={anime.images.webp.large_image_url} alt="" />
                      </div>

                      <div className="infos">
                        <h3>{anime.title}</h3>
                        <p>{anime.synopsis}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="home-season">
          <div className="home-season-intro">
            <h2 className="home-title">Season Now</h2>
          </div>

          <div className="home-season-list">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              spaceBetween={50}
              slidesPerView={2}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={{
                768: {
                  //min-width: 768px
                  slidesPerView: 6,
                  spaceBetween: 15,
                },
              }}
            >
              {animesSeason.map((season) => {
                return (
                  <SwiperSlide key={season.mal_id}>
                    <Link className="card-link" to={`/anime/${season.mal_id}`}>
                      <div className="card-content">
                        <div className="image">
                          <img
                            src={season.images.webp.image_url}
                            alt={season.title}
                          />
                        </div>

                        <p>
                          <strong>{season.title}</strong>
                          <span>(season {season.season})</span>
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="home-season">
          <div className="home-season-intro">
            <h2 className="home-title">Season Upcoming</h2>
          </div>

          <div className="home-season-list">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              spaceBetween={50}
              slidesPerView={2}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={{
                768: {
                  //min-width: 768px
                  slidesPerView: 6,
                  spaceBetween: 15,
                },
              }}
            >
              {upcomingSeason.map((upcoming) => {
                return (
                  <SwiperSlide key={upcoming.mal_id}>
                    <Link
                      className="card-link"
                      to={`/anime/${upcoming.mal_id}`}
                    >
                      <div className="card-content">
                        <div className="image">
                          <img
                            src={upcoming.images.webp.image_url}
                            alt={upcoming.title}
                          />
                        </div>

                        <p>
                          <strong>{upcoming.title}</strong>
                          <span>(upcoming {upcoming.upcoming})</span>
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
