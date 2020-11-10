import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { auth } from '../firebase';
import logo from '../Images/logo.png';
import './Navigation.css';

function Navigation(props) {
  const { handleLogout, userState } = props;
  const { user } = userState;

  const handleLogoutUser = () => {
    handleLogout();
    if (user) {
      auth.signOut();
    }
  };

  const closeMenu = () => {
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
                    Welcome <span>{user.email}</span>
                  </li>
                )}{' '}
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
                <li>
                  <Link to="/search-by-date" onClick={closeMenu}>
                    Date Search
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
                  {!user && (
                    <Link to="/login" onClick={closeMenu}>
                      Login
                    </Link>
                  )}
                </li>
                {user && (
                  <li>
                    <button
                      onClick={() => handleLogoutUser()}
                      className="navigation__signout"
                      type="button"
                    >
                      Logout
                    </button>
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

Navigation.propTypes = {
  userState: PropTypes.shape({
    user: PropTypes.instanceOf(Object),
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userState: state,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
