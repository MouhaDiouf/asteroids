import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { auth } from '../firebase';
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
      <span>
        <Link to="/">Home</Link>
      </span>
      <span>
        <Link to="/choose-date">Search By Date</Link>
      </span>
      <span>
        <Link to="/choose-by-id">Asteroid ID Search</Link>
      </span>
      <span>
        {!user && <span>Welcome Guest</span> && <Link to="/login">Login</Link>}
        {user && <span>Welcome {user.email}</span>} <br />
      </span>
      {user && (
        <a onClick={() => handleLogoutUser()} className="navigation__signout">
          Logout
        </a>
      )}
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
