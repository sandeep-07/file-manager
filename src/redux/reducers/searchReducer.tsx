const intitialState = {
  query: "",
  searchResults: [],
};

const searchReducer = (state = intitialState, action: any) => {
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};
export default searchReducer;
