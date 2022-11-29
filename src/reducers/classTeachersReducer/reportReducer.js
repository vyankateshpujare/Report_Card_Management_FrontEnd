import * as actions from "../../actions/actionType";

export const reportReducer = (
  state = { reports: [], totalReports: 0 },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_REPORTS:
      return { ...state, reports: action.payload.reports };

    case actions.GET_TOTAL_REPORTS:
      return { ...state, totalReports: action.payload.totalReports };

    case actions.ADD_REPORT:
      return { ...state, reports: [...state.reports, action.payload.report] };

    case actions.ADD_REMARK:
      const updatedArr = state.reports.map((r) => {
        if (r._id === action.payload.report._id) {
          r = action.payload.report;
        }
        return r;
      });
      return { ...state, reports: updatedArr };

    case actions.DELETE_REPORT:
      const newArr = state.reports.filter(
        (r) => r._id !== action.payload.report._id
      );
      return { ...state, reports: newArr };
    default:
      return state;
  }
};
