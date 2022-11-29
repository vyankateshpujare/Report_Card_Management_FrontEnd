import axios from "axios";
import * as actions from "./actionType";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";

export const getAllUsers = () => (dispatch, getState) => {
  axios
    .get(apiEndPoint)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_USERS,
        payload: { users: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getCurrentUser = (id) => (dispatch) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_USER,
        payload: { user: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const generateAndSendOtp = (userId) => (dispatch) => {
  axios
    .post(apiEndPoint + "/generateandsendotp", { userId })
    .then((response) =>
      dispatch({
        type: actions.GENERATE_AND_SEND_OTP,
        payload: { otp: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const resetPassword = (data) => (dispatch, getState) => {
  axios
    .patch(apiEndPoint + "/" + data.id, {
      _id: data.id,
      password: data.password,
    })
    .then((response) =>
      dispatch({
        type: actions.RESET_PASSWORD,
        payload: { user: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const addUser = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data)
    .then((response) =>
      dispatch({
        type: actions.ADD_USER,
        payload: { user: response.data },
      })
    )
    .catch((err) => console.log(err));
};
