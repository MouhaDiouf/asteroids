import axios from 'axios';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const ADDING_TO_FAVORITES = 'ADDING_TO_FAVORITES';
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SEARCHING_BY_DATE = 'SEARCHING_BY_DATE';
export const FINISHED_SEARCHING_BY_DATE = 'FINISHED_SEARCHING_BY_DATE';
export const SEARCHING_BY_ID = 'SEARCHING_BY_ID';
export const SEARCH_BY_ID_FINISHED = 'SEARCH_BY_ID_FINISHED';
export const SEARCH_BY_ID_ERROR = 'SEARCH_BY_ID_ERROR';
export const SEARCH_BY_ID_SUCCESS = 'SEARCH_BY_ID_SUCCESS';

const api_key = process.env.REACT_APP_API_KEY;
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
  dispatch({
    type: LOGOUT_USER,
    user: null,
  });
};

export const searchByDate = (startDate, endDate) => (dispatch) => {
  dispatch({
    type: SEARCHING_BY_DATE,
  });
  axios
    .get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${api_key}`,
    )
    .then((response) => {
      dispatch({
        type: FINISHED_SEARCHING_BY_DATE,
        result: response.data.near_earth_objects,
      });
    })
    .catch((error) => console.log(error));
};

export const idSearch = (id) => (dispatch) => {
  dispatch({
    type: SEARCHING_BY_ID,
  });
  axios
    .get(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${api_key}`)
    .then((response) => {
      dispatch({
        type: SEARCH_BY_ID_SUCCESS,
        asteroid: response.data,
      });
      dispatch({
        type: SEARCH_BY_ID_FINISHED,
      });
    })
    .catch((error) => {
      dispatch({
        type: SEARCH_BY_ID_ERROR,
      });
    });
};
