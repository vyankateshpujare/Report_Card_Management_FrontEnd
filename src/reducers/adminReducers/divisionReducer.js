import * as actions from "../../actions/actionType";

export const divisionReducer = (
  state = { divisions: [], currentDivision: {}, totalNoOfDivision: 0 },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_DIVISIONS:
      return { ...state, divisions: action.payload.divisions };

    case actions.GET_CURRENT_DIVISION:
      return { ...state, currentDivision: action.payload.division };

    case actions.GET_TOTAL_DIVISION:
      return { ...state, totalNoOfDivision: action.payload.totalNoOfDivision };

    case actions.ADD_DIVISION:
      return {
        ...state,
        divisions: [...state.divisions, { ...action.payload.division }],
      };

    case actions.UPDATE_DIVISION:
      const updatedArr = state.divisions.map((d) => {
        if (d._id === action.payload.division._id) {
          d = action.payload.division;
        }
        return d;
      });
      return {
        ...state,
        divisions: [...updatedArr],
      };

    case actions.DELETE_DIVISION:
      const newArr = state.divisions.filter(
        (d) => d._id !== action.payload.division._id
      );
      return { ...state, divisions: newArr };

    default:
      return state;
  }
};
