import React from 'react';
import './Header.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import astronaut from '../Images/astronaut.png';

function Header() {
  return (
    <div className="header">
      <div className="header__content">
        <div className="header__image">
          <img src={astronaut} alt="astronaut" />
        </div>
        <div className="header__text">
          <h1 className="header__title">ASTEROIDS</h1>

          <p className="header__description">
            A Space App That Talks About Asteroids
          </p>
          <Button variant="contained" color="primary" size="large">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
      <div className="arrow">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default Header;
