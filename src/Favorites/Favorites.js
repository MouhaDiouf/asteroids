import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { db } from '../firebase';
import './Favorites.css';
import AsteroidCard from '../AsteroidCard/AsteroidCard';

function Favorites({ userState }) {
  const { user } = userState;
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
        {favorites.map((favorite) => (
          <AsteroidCard
            key={favorite.data.asteroid.id}
            asteroid={favorite.data.asteroid}
            favorite="true"
          />
        ))}
      </div>
    </div>
  );
}

Favorites.propTypes = {
  userState: PropTypes.shape({
    user: PropTypes.instanceOf(Object).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userState: state,
});

export default connect(mapStateToProps)(Favorites);
