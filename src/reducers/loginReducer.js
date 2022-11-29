import * as actions from "../actions/actionType";
export const loginReducer = (state = { token: "" }, action) => {
  switch (action.type) {
    case actions.LOGIN_USER:
      // console.log("reducer",action.payload.token);
      return { token: action.payload.token };

    case actions.LOGOUT_USER:
      return { token: "", user: null };

    default:
      return state;
  }
};
