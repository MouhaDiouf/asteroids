import React from 'react';
import Meteor from './Images/meteor.png';
import { addToFavorites } from './actions';
import { connect } from 'react-redux';
import { db } from './firebase';

function Asteroid(props) {
  const { name, type } = props.asteroid;
  const { user } = props.userState;

  const handleAddToFavorites = () => {
    console.log('this is asteroid ', props.asteroid);
    console.log(db);
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
      <button onClick={handleAddToFavorites}>Add To Favorites</button>
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
