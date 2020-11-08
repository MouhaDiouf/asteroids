import React from 'react';
import Asteroid from '../Asteroid';
import './AsteroidsDateResults.css';

function AsteroidsDateResults({ asteroids }) {
  console.log('Asteroids is', asteroids);
  return (
    <div className="date-results">
      <h1>Results By Date</h1>
      <div className="date-results__asteroids">
        {Object.entries(asteroids).map(([day, asteroidsByDate]) => {
          return asteroidsByDate.map((asteroid) => {
            return <Asteroid asteroid={asteroid} />;
          });
        })}
      </div>
    </div>
  );
}

export default AsteroidsDateResults;
