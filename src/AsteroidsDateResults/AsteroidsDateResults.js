import React from 'react';
import PropTypes from 'prop-types';
import AsteroidCard from '../AsteroidCard/AsteroidCard';
import './AsteroidsDateResults.css';

function AsteroidsDateResults({ asteroids }) {
  let count = 0;

  return (
    <div className="date-results">
      <h1>Results By Date</h1>
      <div className="date-results__asteroids">
        {Object.entries(asteroids).map(([_, asteroidsByDate]) => asteroidsByDate.map((asteroid) => {
          if (count < 10) {
            count += 1;
            return <AsteroidCard asteroid={asteroid} />;
          }
        }))}
      </div>
    </div>
  );
}

AsteroidsDateResults.propTypes = {
  asteroids: PropTypes.instanceOf(Object).isRequired,
};
export default AsteroidsDateResults;
