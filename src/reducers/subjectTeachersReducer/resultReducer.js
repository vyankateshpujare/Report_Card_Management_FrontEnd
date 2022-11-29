import * as actions from "../../actions/actionType";

export const testResultReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_TEST_RESULTS:
      return { ...state, results: action.payload.results };

    case actions.ADD_RESULT:
      return {
        ...state,
        results: [...state.results, { ...action.payload.result }],
      };

    case actions.DELETE_RESULT:
      const newArr = state.results.filter(
        (r) => r._id !== action.payload.result._id
      );
      return { ...state, results: newArr };

    default:
      return state;
  }
};
