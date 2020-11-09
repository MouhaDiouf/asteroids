import React from 'react';
import Asteroid from '../Asteroid';
import spinner from '../Images/spinner.gif';
import './Home.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AsteroidCard from '../AsteroidCard/AsteroidCard';
import IdSearch from '../IdSearch/IdSearch';
import Header from '../Header/Header';

function Home(props) {
  const { user } = props.userState;

  return (
    <div className="app__div">
      <Header />
      <IdSearch />
      {!user && (
        <p className="login-notice">
          <Link to="/login">Login</Link> to add Asteroids to your favorites
        </p>
      )}

      {props.nearEarthObjects?.length ? (
        <div className="app__browse_asteroids">
          {props.nearEarthObjects.map((asteroid) => (
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

const mapStateToProps = (state) => ({
  userState: state,
});
export default connect(mapStateToProps)(Home);
