import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { auth } from '../firebase';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';

import './NavBar.css';

function NavBar(props) {
  const { user } = props.userState;
  const [menu, setMenu] = useState('breadcrumb');

  const handleLogoutUser = () => {
    console.log('handleLogoutUser called');
    props.handleLogout();
    if (user) {
      auth.signOut();
    }
  };

  const toggleMenu = () => {
    const menu = document.querySelector('.menu-list');
    if (!menu.classList.contains('appear')) {
      document.querySelector('.navigation').classList.add('full-width');
      menu.classList.remove('disappear');
      menu.classList.add('appear');
      closeOnListClick();
    } else if (menu.classList.contains('appear')) {
      menu.classList.remove('appear');
      menu.classList.add('disappear');
      document.querySelector('.navigation').classList.remove('full-width');
    }
  };

  const toggleIcon = () => {
    if (menu === 'breadcrumb') {
      setMenu('close');
    } else {
      setMenu('breadcrumb');
    }
  };

  const closeOnListClick = () => {
    const allNavLinks = Array.from(document.querySelectorAll('.menu-list li'));
    allNavLinks.forEach((navLink) => {
      navLink.addEventListener('click', () => {
        const menu = document.querySelector('.menu-list');
        if (menu.classList.contains('appear')) {
          toggleMenu();
          toggleIcon();
        }
      });
    });
  };
  return (
    <div className="navigation">
      <div className="navigation__left">
        <span className="navigation__logo">
          <Link to="/">ASTEROIDS</Link>
        </span>
      </div>

      <div className="navigation__icon">
        {menu === 'breadcrumb' ? (
          <MoreHorizIcon
            className="navigation__icon-horizontal breadcrumb"
            onClick={() => {
              toggleMenu();
              toggleIcon();
            }}
          />
        ) : (
          <CloseIcon
            className="navigation__icon-close close-icon"
            onClick={() => {
              toggleMenu();
              toggleIcon();
            }}
          />
        )}
      </div>

      <ul className="navigation__right menu-list disappear">
        <li className="navigation__element">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation__element">
          <Link to="/search-by-date">Search By Date</Link>
        </li>
        <li className="navigation__element">
          <Link to="/search-by-id">Asteroid ID Search</Link>
        </li>
        {user && (
          <li className="navigation__element">
            <Link to="/favorites">Your Favorites</Link>
          </li>
        )}
        <li className="navigation__element">
          {!user && <li>Welcome Guest</li> && <Link to="/login">Login</Link>}
          {user && <li>Welcome {user.email}</li>} <br />
        </li>
        {user && (
          <li>
            <a
              onClick={() => handleLogoutUser()}
              className="navigation__signout"
            >
              Logout
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
const mapStateToProps = (state) => ({
  userState: state,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
