import React from 'react';
import Meteor from './Images/meteor.png';

function Asteroid() {
  return (
    <div className="app__asteroid_div">
      <img src={Meteor} alt="Meteor" />
      <button>Add To Favorites</button>
    </div>
  );
}

export default Asteroid;
