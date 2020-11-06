const initialState = {
  favorites: [],
  user: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.item],
      };
    default:
      return state;
  }
};

export default reducer;
