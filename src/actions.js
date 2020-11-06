export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

export const addToFavorites = (asteroid) => (dispatch) => {
  dispatch({
    type: ADD_TO_FAVORITES,
    asteroid,
  });
};
