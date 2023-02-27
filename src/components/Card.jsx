import { Link } from 'react-router-dom';

import './Card.scss';

const Card = (props) => {
  const { urlAnime, srcImage, title, synopsis, japaneseTitle, season } = props;

  return (
    <Link className="card" to={urlAnime}>
      <div className="card-content">
        <div className="card-image">
          <img src={srcImage} alt={title} />
        </div>

        <div className="card-infos">
          <p className="cardTitle">
            <strong>{title}</strong>{' '}
          </p>

          {synopsis ? <p className="cardSynopsis">{synopsis}</p> : null}

          {japaneseTitle ? <p className="japanese">{japaneseTitle}</p> : null}

          {season ? <p className="season">season {season}</p> : null}
        </div>
      </div>
    </Link>
  );
};

export default Card;
