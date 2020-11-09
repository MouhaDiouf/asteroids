import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { auth } from '../firebase';
import logo from '../Images/logo.png';
import './Navigation.css';

function Navigation(props) {
  const { user } = props.userState;

  const handleLogoutUser = () => {
    props.handleLogout();
    if (user) {
      auth.signOut();
    }
  };

  const closeMenu = () => {
    console.log('close menu called');
    const checkbox = document.querySelector('.toggler');
    checkbox.click();
  };
  return (
    <div className="navigation">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="menu-wrap">
        <input type="checkbox" className="toggler" />
        <div className="hamburger">
          <div />
        </div>

        <div className="menu">
          <div>
            <div>
              <ul>
                {user && (
                <li className="welcome-user">
                  Welcome
                  {user.email}
                </li>
                )}
                {' '}
                <br />
                <li>
                  <Link to="/" onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={closeMenu}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/search-by-id" onClick={closeMenu}>
                    ID Search
                  </Link>
                </li>
                {user && (
                  <li className="navigation__element">
                    <Link to="/favorites" onClick={closeMenu}>
                      Your Favorites
                    </Link>
                  </li>
                )}
                <li className="navigation__element">
                  {!user && <li>Welcome Guest</li> && (
                    <Link to="/login" onClick={closeMenu}>
                      Login
                    </Link>
                  )}
                </li>
                {user && (
                  <li>
                    <a
                      onClick={() => handleLogoutUser()}
                      //   onClick={closeMenu}
                      className="navigation__signout"
                    >
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userState: state,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
