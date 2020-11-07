import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { connect } from 'react-redux';
import Favorite from '../Favorite/Favorite';
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
            }))
          );
        });
    } else {
      setFavorites([]);
    }
  }, [user]);
  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.map((favorite) => (
        <Favorite asteroid={favorite} />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userState: state,
});

export default connect(mapStateToProps)(Favorites);
