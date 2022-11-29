import * as actions from "../../actions/actionType";

export const standardReducer = (
  state = { standards: [], currentStandard: {}, totalNoOfStandard: 0 },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_STANDARDS:
      return { ...state, standards: action.payload.standards };

    case actions.GET_CURRENT_STANDARD: {
      return { ...state, currentStandard: action.payload.standard };
    }

    case actions.GET_TOTAL_STANDARD:
      return { ...state, totalNoOfStandard: action.payload.totalNoOfStandard };

    case actions.ADD_STANDARD:
      return {
        ...state,
        standards: [...state.standards, { ...action.payload.standard }],
      };

    case actions.UPDATE_STANDARD:
      const updatedArr = state.standards.map((s) => {
        if (s._id === action.payload.standard._id) {
          s = action.payload.standard;
        }
        return s;
      });
      return {
        ...state,
        standards: [...updatedArr],
      };

    case actions.DELETE_STANDARD:
      const newArr = state.standards.filter(
        (s) => s._id !== action.payload.standard._id
      );
      return { ...state, standards: newArr };

    default:
      return state;
  }
};
