import * as actions from "./actionType";
import axios from "axios";
import { toast } from "react-toastify";

const apiEndPoint = process.env.REACT_APP_API_URL + "login";

export const loginUser = (user) => (dispatch, getState) => {
  const loginFailed = (message) =>
    toast.error(message, {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });

  axios
    .post(apiEndPoint, user)
    .then((response) => {
      sessionStorage.setItem("token", response.data);
      dispatch({ type: actions.LOGIN_USER, payload: { token: response.data } });
    })
    .catch((err) => {
      loginFailed("Invalid Email and Password!");
    });
};

export const logoutUser = () => {
  sessionStorage.setItem("token", "");
  return { type: actions.LOGOUT_USER };
};

export const loadLogin = () => {
  return {
    type: actions.LOGIN_USER,
    payload: { token: sessionStorage.getItem("token") },
  };
};
