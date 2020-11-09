import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { db } from '../firebase';
import Asteroid from '../Asteroid';
import './Favorites.css';
import AsteroidCard from '../AsteroidCard/AsteroidCard';
import { Snackbar } from '@material-ui/core';

function Favorites(props) {
  const { user } = props.userState;
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('favorites')
        .onSnapshot((snapshot) => {
          setFavorites(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          );
        });
    } else {
      setFavorites([]);
    }
  }, [user]);
  return (
    <div>
      <h1 className="favorites-title">Your Favorites</h1>

      <div className="favorites-div">
        {favorites.map((favorite) => {
          console.log('favorite is ', favorite);
          return (
            <AsteroidCard asteroid={favorite.data.asteroid} favorite="true" />
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userState: state,
});

export default connect(mapStateToProps)(Favorites);
