import * as actions from "../../actions/actionType";

export const userRoleReducer = (
  state = { userRoles: [], currentUserRole: {}, totalNoOfUserRoles: 0 },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_USERROLES:
      return { ...state, userRoles: action.payload.userRoles };

    case actions.GET_CURRENT_USERROLE:
      return { ...state, currentUserRole: action.payload.userRole };

    case actions.GET_TOTAL_USERROLES:
      return { ...state, totalNoOfUserRoles: action.payload.totalNoOfUserRoles };

    case actions.ADD_USERROLE:
      return {
        ...state,
        userRoles: [...state.userRoles, { ...action.payload.userRole }],
      };

    case actions.UPDATE_USERROLE:
      const updatedArr = state.userRoles.map((u) => {
        if (u._id === action.payload.userRole) {
          u = action.payload.userRole;
        }
        return u;
      });
      return { ...state, userRoles: updatedArr };

    case actions.DELETE_USERROLE:
      const newArr = state.userRoles.filter(
        (u) => u._id !== action.payload.userRole._id
      );
      return { ...state, userRoles: newArr };

    default:
      return state;
  }
};
