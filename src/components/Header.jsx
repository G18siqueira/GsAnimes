import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import './Header.scss';

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setToggle(!toggle);
    }
  };

  const menuClass = toggle ? 'active' : ' ';

  return (
    <header className="header">
      <div className="container">
        <div className="header-menu">
          <div className="header-logo">
            <h2 className={menuClass}>
              <Link className='' to="/">GsAnimeZone</Link>
            </h2>
          </div>

          <div className={`header-content ${menuClass}`}>
            <Link
              className="header-link header-link_logo"
              onClick={handleClick}
              to="/"
            >
              GsAnimeZone
            </Link>
            <Link className="header-link" onClick={handleClick} to="/animes?q=">
              Search Animes
            </Link>
            <Link
              className="header-link"
              onClick={handleClick}
              to="/animes-favoritos"
            >
              My Favorite Animes
            </Link>
          </div>

          <button className="header-toggle" onClick={handleClick}>
            {toggle ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
