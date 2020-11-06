export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const ADDING_TO_FAVORITES = 'ADDING_TO_FAVORITES';

export const addToFavorites = (asteroid) => (dispatch) => {
  dispatch({
    type: ADDING_TO_FAVORITES,
  });

  dispatch({
    type: ADD_TO_FAVORITES,
    asteroid,
  });
};
