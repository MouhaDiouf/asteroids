import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { auth } from '../firebase';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../Images/logo.png';

import './NavBar.css';

function NavBar(props) {
  const { user } = props.userState;
  const [menuIcon, setMenuIcon] = useState('breadcrumb');

  const handleLogoutUser = () => {
    props.handleLogout();
    if (user) {
      auth.signOut();
    }
  };

  const toggleMenu = () => {
    const menu = document.querySelector('.menu-list');
    if (!menu.classList.contains('appear')) {
      document.querySelector('.navigation').classList.add('full-width');
      document.querySelector('.navigation__left').style.display = 'none';
      menu.classList.remove('disappear');
      menu.classList.add('appear');
      closeOnListClick();
    } else if (menu.classList.contains('appear')) {
      menu.classList.remove('appear');
      menu.classList.add('disappear');
      document.querySelector('.navigation').classList.remove('full-width');
      document.querySelector('.navigation__left').style.display = 'block';
    }
  };

  const toggleIcon = () => {
    console.log('menu icon is ', menuIcon);
    menuIcon === 'close' ? setMenuIcon('breadcrumb') : setMenuIcon('close');
  };

  const closeOnListClick = () => {
    const allNavLinks = Array.from(
      document.querySelectorAll('.menu-list li a')
    );
    allNavLinks.forEach((navLink) => {
      navLink.addEventListener('click', () => {
        const menu = document.querySelector('.menu-list');
        if (menu.classList.contains('appear')) {
          toggleMenu();
          // toggleIcon();
        }
      });
    });
  };
  return (
    <div className="navigation">
      <div className="navigation__left">
        <span className="navigation__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </span>
      </div>

      <div className="navigation__icon">
        {menuIcon === 'breadcrumb' ? (
          <MoreHorizIcon
            className="navigation__icon-horizontal breadcrumb"
            onClick={() => {
              toggleMenu();
              // toggleIcon();
            }}
          />
        ) : (
          <CloseIcon
            className="navigation__icon-close close-icon"
            onClick={() => {
              toggleMenu();
              // toggleIcon();
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
