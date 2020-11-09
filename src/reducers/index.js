import {
  ADDING_TO_FAVORITES,
  ADD_TO_FAVORITES,
  SET_USER,
  LOGOUT_USER,
  FINISHED_SEARCHING_BY_DATE,
  SEARCHING_BY_ID,
  SEARCH_BY_ID_FINISHED,
  SEARCHING_BY_DATE,
  SEARCH_BY_ID_ERROR,
  SEARCH_BY_ID_SUCCESS,
} from '../actions';

const initialState = {
  favorites: [],
  user: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_TO_FAVORITES:
      return {
        ...state,
        addingToFavorites: true,
      };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.item],
        addingToFavorites: false,
      };
    case SEARCHING_BY_DATE:
      return {
        ...state,
        searchingByDate: true,
      };
    case FINISHED_SEARCHING_BY_DATE:
      return {
        ...state,
        searchingByDate: false,
        asteroidsByDate: action.result,
      };
    case SEARCHING_BY_ID:
      return {
        ...state,
        searchingById: true,
      };

    case SEARCH_BY_ID_SUCCESS:
      return {
        ...state,
        asteroidFetched: action.asteroid,
        searchingById: false,
        redirectToIdPage: true,
      };

    case SEARCH_BY_ID_FINISHED:
      return {
        ...state,
        redirectToIdPage: false,
      };

    case SEARCH_BY_ID_ERROR:
      return {
        ...state,
        searchByIdError: true,
        searchingById: false,
      };

    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
