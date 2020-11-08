import React from 'react';
import { db } from '../firebase';
import { connect } from 'react-redux';
function Favorite(props) {
  const { asteroid } = props;
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
  return (
    <div className="favorite">
      <h2>{asteroid.id}</h2>
      <button onClick={removeFromFavorites}>Remove From Favorites</button>
    </div>
  );
}
const mapStateToProps = (state) => ({
  userState: state,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
