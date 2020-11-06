import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
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
      <Link to="/login">Login</Link>
    </ul>
  );
}

export default NavBar;
