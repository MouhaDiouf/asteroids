import React from 'react';
import Meteor from './Images/meteor.png';
import { addToFavorites } from './actions';
import { connect } from 'react-redux';
import { db } from './firebase';
import { Link } from 'react-router-dom';

function Asteroid(props) {
  const { name, type, id } = props.asteroid;
  const { user } = props.userState;
  const removeFromFavorites = () => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('favorites')
        .doc(props.asteroid.id)
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
        .doc(props.asteroid.id)
        .set({
          asteroid: props.asteroid,
        });
    }
  };
  return (
    <div className="app__asteroid_div">
      <img src={Meteor} alt="Meteor" />
      <h1>{name}</h1>
      <h2>{type}</h2>
      {user && !props.favorite && (
        <button onClick={handleAddToFavorites}>Add To Favorites</button>
      )}
      {user && props.favorite && (
        <button onClick={removeFromFavorites}>Remove From Favorites</button>
      )}
      <Link to={`asteroids/${id}/details`}>More Details</Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userState: state,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavoritesOnClick: (asteroid) => dispatch(addToFavorites(asteroid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Asteroid);
