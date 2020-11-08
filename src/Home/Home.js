import React from 'react';
import Asteroid from '../Asteroid';
import spinner from '../Images/spinner.gif';
import './Home.css';

function Home({ nearEarthObjects }) {
  return (
    <div>
      <h1>Welcome to Asteroids</h1>

      {nearEarthObjects?.length ? (
        <div className="app__browse_asteroids">
          {nearEarthObjects.map((asteroid) => (
            <Asteroid asteroid={asteroid} key={asteroid.id} />
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

export default Home;
