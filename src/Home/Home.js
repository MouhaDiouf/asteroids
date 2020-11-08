import React from 'react';
import Asteroid from '../Asteroid';

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
        <p>Fetching near earth objects</p>
      )}
    </div>
  );
}

export default Home;
