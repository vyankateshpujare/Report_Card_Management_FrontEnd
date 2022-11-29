import { type } from "@testing-library/user-event/dist/type";
import * as actions from "../../actions/actionType";

export const testReducer = (state = { tests: [], currentTest: {} }, action) => {
  switch (action.type) {
    case actions.GET_ALL_TESTS:
      return { ...state, tests: action.payload.tests };

    case actions.GET_CURRENT_TEST:
      return { ...state, currentTest: action.payload.test };

    case actions.ADD_TEST:
      return { ...state, tests: [...state.tests, { ...action.payload.test }] };

    case actions.UPDATE_TEST:
      const updatedArr = state.tests.map((t) => {
        if (t._id === action.payload.test._id) {
          t = action.payload.test;
        }
        return t;
      });
      return { ...state, tests: updatedArr };

    case actions.DELETE_TEST:
      const newArr = state.tests.filter(
        (t) => t._id !== action.payload.test._id
      );
      return { ...state, tests: newArr };
      
    default:
      return state;
  }
};
