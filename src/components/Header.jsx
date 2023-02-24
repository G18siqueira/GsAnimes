import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-menu">
          <div className="header-logo">
            <h2>
              <Link className="" to="/">
                GsAnimeZone
              </Link>
            </h2>
          </div>

          <div className="header-content">
            <Link className="header-link" to="/animes">
              Search Animes
            </Link>
            <Link className="header-link" to="/animes-favoritos">
              My Favorite Animes
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
