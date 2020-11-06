const initialState = {
  favorites: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state, action.item],
      };
    default:
      return state;
  }
};

export default reducer;
