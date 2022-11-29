import * as actions from "../actions/actionType";

export const userReducer = (
  state = { users: [], currentUser: {}, otp: 0 },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_USERS:
      return { ...state, users: action.payload.users };

    case actions.GENERATE_AND_SEND_OTP:
      return { ...state, otp: action.payload.otp };

    case actions.GET_CURRENT_USER:
      return { ...state, currentUser: action.payload.user };

    case actions.ADD_USER:
      return { ...state, users: [...state.users, { ...action.payload.user }] };

      case actions.RESET_PASSWORD:
        const updatedArr = state.users.map((user) => {
          if (user._id === action.payload.user._id) {
            user = action.payload.user;
          }
          return user;
        });
        return { ...state,users: updatedArr };

    default:
      return state;
  }
};
