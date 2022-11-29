import * as actions from "../../actions/actionType";

export const subjectReducer = (state = { subjects: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_SUBJECTS:
      return { ...state, subjects: action.payload.subjects };

    default:
      return state;
  }
};
