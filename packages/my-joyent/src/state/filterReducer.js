const filterReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_FILTERS':
      return {
        ...state,
        ...action.filters
      };
    default:
      return state;
  }
};

export default filterReducer;
