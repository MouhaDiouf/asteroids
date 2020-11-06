import React from 'react';
import Meteor from './Images/meteor.png';
import { addToFavorites } from './actions';
import { connect } from 'react-redux';

function Asteroid(props) {
  const { name, type } = props.asteroid;

  const handleAddToFavorites = () => {
    console.log(props.asteroid);
    props.addToFavoritesOnClick(props.asteroid);
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

const mapDispatchToProps = (dispatch) => ({
  addToFavoritesOnClick: (asteroid) => dispatch(addToFavorites(asteroid)),
});
export default connect(null, mapDispatchToProps)(Asteroid);
