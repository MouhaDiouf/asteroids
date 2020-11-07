import {
  ADDING_TO_FAVORITES,
  ADD_TO_FAVORITES,
  SET_USER,
  LOGOUT_USER,
  FINISHED_SEARCHING_BY_DATE,
} from '../actions';

const initialState = {
  favorites: [],
  user: null,
};

export const reducer = (state = initialState, action) => {
  console.log('action is ', action);
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
    case FINISHED_SEARCHING_BY_DATE:
      return {
        ...state,
        searchingByDate: false,
        asteroidsByDate: action.result,
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
