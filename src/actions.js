export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const ADDING_TO_FAVORITES = 'ADDING_TO_FAVORITES';
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
require('dotenv').config();

const api_key = process.env.API_KEY;
export const addToFavorites = (asteroid) => (dispatch) => {
  dispatch({
    type: ADDING_TO_FAVORITES,
  });

  dispatch({
    type: ADD_TO_FAVORITES,
    asteroid,
  });
};

export const setUser = (user) => (dispatch) => {
  console.log('set user called');
  dispatch({
    type: SET_USER,
    user,
  });
};

export const logout = () => (dispatch) => {
  console.log('logout called');
  dispatch({
    type: LOGOUT_USER,
    user: null,
  });
};

export const searchByDate = (startDate, endDate) => {
  dispatch({
    type: SEARCHING_BY_DATE,
  });
  axios.get(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-12-12&end_date=2020-09-09&detailed=true&api_key=${api_key}`
  );
};
