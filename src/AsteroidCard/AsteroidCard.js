import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { db } from '../firebase';
import { addToFavorites } from '../actions';

import './AsteroidCard.scss';

function AsteroidCard({ favorite, asteroid, userState }) {
  const { user } = userState;

  const removeFromFavorites = () => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('favorites')
        .doc(asteroid.id)
        .delete()
        .then(() => console.log('Asteroid successfully removed from favorites'))
        .catch((error) =>
          console.error('Error removing the asteroid: ', error)
        );
    }
  };

  const handleAddToFavorites = () => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('favorites')
        .doc(asteroid.id)
        .set({
          asteroid,
        });
    }
  };

  return (
    <div className="asteroidcard">
      <div className="card">
        <div className="card__side card__side--back">
          <div className="card__cover">
            <h4 className="card__heading">
              <span className="card__heading-span">Asteroid Details</span>
            </h4>
          </div>
          <div className="card__details">
            <ul>
              <li>Name: {asteroid.name}</li>
              <li>
                Estimated Diameter:
                {asteroid.estimated_diameter
                  ? asteroid.estimated_diameter.kilometers
                      .estimated_diameter_min
                  : 'No Data'}{' '}
                km
              </li>
              <li>Absolute Magnitude: {asteroid.absolute_magnitude_h}</li>
              <li>
                Potentially Hazardous:{' '}
                {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
              </li>
              <li>
                First Observation Date:{' '}
                {asteroid.orbital_data
                  ? asteroid.orbital_data.first_observation_date
                  : 'No Data'}
              </li>
              <li>
                Last Observation Date:{' '}
                {asteroid.orbital_data
                  ? asteroid.orbital_data.last_observation_date
                  : 'No Data'}
              </li>
            </ul>
            {user && !favorite && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToFavorites}
              >
                Add To Favorites
              </Button>
            )}
            {user && favorite && (
              <Button
                variant="contained"
                color="secondary"
                onClick={removeFromFavorites}
              >
                Remove From Favorites
              </Button>
            )}{' '}
          </div>
        </div>

        <div className="card__side card__side--front">
          <div className="card__theme">
            <div className="card__theme-box">
              <p className="card__subject">Asteroid</p>
              <p className="card__title">{asteroid.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AsteroidCard.propTypes = {
  asteroid: PropTypes.shape({
    name: PropTypes.string,
    is_potentially_hazardous_asteroid: PropTypes.bool,
    absolute_magnitude_h: PropTypes.number,
    estimated_diameter: PropTypes.object,
    orbital_data: PropTypes.instanceOf(Object),
    id: PropTypes.string,
  }).isRequired,
  favorite: PropTypes.string,
  userState: PropTypes.instanceOf(Object),
};

const mapStateToProps = (state) => ({
  userState: state,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavoritesOnClick: (asteroid) => dispatch(addToFavorites(asteroid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AsteroidCard);
