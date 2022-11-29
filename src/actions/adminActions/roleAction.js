import axios from "axios";
import * as actions from "../actionType";
import { toast } from "react-toastify";

const apiEndPoint = process.env.REACT_APP_API_URL + "roles";

export const getAllRoles = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/pfs", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_ROLES,
        payload: { roles: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getCurrentRole = (id) => (dispatch, getState) => {
  // console.log(id);
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) => {
      console.log(response);
      dispatch({
        type: actions.GET_CURRENT_ROLE,
        payload: { role: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const addRole = (data) => (dispatch) => {
  const alreadyExist = (message) =>
    toast.error(message, {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });

  axios
    .post(apiEndPoint, data)
    .then((response) =>
      dispatch({ type: actions.ADD_ROLE, payload: { role: response.data } })
    )
    .catch((err) => {
      alreadyExist(err.response.data);
    });
};

export const updateRole = (data) => (dispatch) => {
  axios
    .put(apiEndPoint + "/" + data._id, { role: data.role })
    .then((response) =>
      dispatch({ type: actions.UPDATE_ROLE, payload: { role: response.data } })
    )
    .catch((err) => console.log(err));
};

export const deleteRole = (id) => (dispatch) => {
  axios
    .delete(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({ type: actions.DELETE_ROLE, payload: { role: response.data } })
    )
    .catch((err) => console.log(err));
};
