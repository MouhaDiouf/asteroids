import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function NavBar({ userState }) {
  const { user } = userState;
  return (
    <ul className="navigation">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/choose-date">Search By Date</Link>
      </li>
      <li>
        <Link to="/choose-by-id">Asteroid ID Search</Link>
      </li>
      <li>
        {!user && <span>Welcome Guest</span>}
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
}
const mapStateToProps = (state) => ({
  userState: state,
});

export default connect(mapStateToProps, null)(NavBar);
