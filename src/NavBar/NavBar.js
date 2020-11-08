import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { auth } from '../firebase';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './NavBar.css';

function NavBar(props) {
  const { user } = props.userState;

  const handleLogoutUser = () => {
    console.log('handleLogoutUser called');
    props.handleLogout();
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="navigation">
      <div className="navigation__left">
        <span className="navigation__logo">
          <Link to="/">Home</Link>
        </span>
      </div>

      <div className="navigation__icon">
        <MoreHorizIcon className="navigation__icon-horizontal" />
      </div>

      <div className="navigation__right">
        <span className="navigation__element">
          <Link to="/search-by-date">Search By Date</Link>
        </span>
        <span className="navigation__element">
          <Link to="/search-by-id">Asteroid ID Search</Link>
        </span>
        {user && (
          <span className="navigation__element">
            <Link to="/favorites">Your Favorites</Link>
          </span>
        )}
        <span className="navigation__element">
          {!user && <span>Welcome Guest</span> && (
            <Link to="/login">Login</Link>
          )}
          {user && <span>Welcome {user.email}</span>} <br />
        </span>
        {user && (
          <a onClick={() => handleLogoutUser()} className="navigation__signout">
            Logout
          </a>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
