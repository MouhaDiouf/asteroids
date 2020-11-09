import React from 'react';
import AsteroidCard from '../AsteroidCard/AsteroidCard';
import './AsteroidsDateResults.css';

function AsteroidsDateResults({ asteroids }) {
  let count = 0;

  console.log('Asteroids is', asteroids);
  return (
    <div className="date-results">
      <h1>Results By Date</h1>
      <div className="date-results__asteroids">
        {Object.entries(asteroids).map(([_, asteroidsByDate]) => asteroidsByDate.map((asteroid) => {
          if (count < 10) {
            count++;
            return <AsteroidCard asteroid={asteroid} />;
          }
        }))}
      </div>
    </div>
  );
}

export default AsteroidsDateResults;
