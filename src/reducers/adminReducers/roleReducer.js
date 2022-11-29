import * as actions from "../../actions/actionType";

export const roleReducer = (state = { roles: [], currentRole: {} }, action) => {
  switch (action.type) {
    case actions.GET_ALL_ROLES:
      return (state = { roles: action.payload.roles });

    case actions.GET_CURRENT_ROLE:
      console.log("my  role", action.payload.role); 
      return { ...state, currentRole: action.payload.role };

    case actions.ADD_ROLE:
      return { ...state, roles: [...state.roles, { ...action.payload.role }] };

    case actions.UPDATE_ROLE:
      const updatedArr = state.roles.map((r) => {
        if (r._id === action.payload.role._id) {
          r = action.payload.role;
        }
        return r;
      });
      return {
        ...state,
        roles: [...updatedArr],
      };

    case actions.DELETE_ROLE:
      const newArr = state.roles.filter(
        (r) => r._id !== action.payload.role._id
      );
      return { roles: newArr };

    default:
      return state;
  }
};
