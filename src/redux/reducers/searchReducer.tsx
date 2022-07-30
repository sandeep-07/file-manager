import { useSelector } from "react-redux";

const intitialState = {
  query: "",
  searchResults: [],
};

const searchRecursive = (state: any, results: any, query: string) => {
  query = query.toLowerCase();
  if (query && query !== "" && state.name.includes(query)) {
    results.push(state);
  }
  for (let k in state.children) {
    searchRecursive(state.children[k], results, query);
  }
};

const searchReducer = (state = intitialState, action: any) => {
  switch (action.type) {
    case "SET_QUERY":
      const results = [] as any;
      // console.log(action.payload);

      searchRecursive(
        action.payload?.globalState,
        results,
        action.payload?.query
      );
      
      return {
        ...state,
        query: action.payload.query,
        searchResults: results,
      };
    default:
      return state;
  }
};
export default searchReducer;
