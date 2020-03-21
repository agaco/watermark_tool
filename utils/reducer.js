export const imagesReducer = (state, action) => {
  switch (action.type) {
  case 'SET_LOADING_ACTION':
    return {
      ...state,
      isLoading: true,
      images: [],
    };
  case 'SET_SEARCH_ACTION':
    return {
      ...state,
      images: action.payload,
      singleImage: {},
      isLoading: false,
    };
  case 'SET_EDIT_ITEM_ACTION':
    return {
      ...state,
      singleImage: action.payload,
    };
  }
};
