import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AsteroidCard from '../AsteroidCard/AsteroidCard';
import IdSearch from '../IdSearch/IdSearch';
import Header from '../Header/Header';
import spinner from '../Images/spinner.gif';

function Home({ userState, nearEarthObjects }) {
  const { user } = userState;

  return (
    <div className="app__div">
      <Header />
      <IdSearch />
      {!user && (
        <p className="login-notice">
          <Link to="/login">Login</Link> to add Asteroids to your favorites
        </p>
      )}

      {nearEarthObjects && nearEarthObjects.length ? (
        <div className="app__browse_asteroids">
          {nearEarthObjects.map((asteroid) => (
            <AsteroidCard asteroid={asteroid} key={asteroid.id} />
          ))}
        </div>
      ) : (
        <>
          <p>Fetching near earth objects</p>
          <img className="spinner" src={spinner} alt="spinner" />
        </>
      )}
    </div>
  );
}

Home.propTypes = {
  userState: PropTypes.shape({
    user: PropTypes.instanceOf(Object),
  }).isRequired,
  nearEarthObjects: PropTypes.instanceOf(Array),
};

const mapStateToProps = (state) => ({
  userState: state,
});
export default connect(mapStateToProps)(Home);
