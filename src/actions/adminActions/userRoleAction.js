import axios from "axios";
import * as actions from "../actionType";

const apiEndPoint = process.env.REACT_APP_API_URL + "userroles";

export const getAllUserRoles = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/pfs", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_USERROLES,
        payload: { userRoles: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getCurrentUserRole = (id) => (dispatch, getState) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) => {
      console.log("data" + response.data);
      dispatch({
        type: actions.GET_CURRENT_USERROLE,
        payload: { userRole: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const getTotalUserRoles = (data) => (dispatch, getState) => {
  axios.post(apiEndPoint + "/countuserroles", data).then((response) =>
    dispatch({
      type: actions.GET_TOTAL_USERROLES,
      payload: { totalNoOfUserRoles: response.data },
    })
  );
};

export const addUserRole = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data)
    .then((response) =>
      dispatch({
        type: actions.ADD_USERROLE,
        payload: { userRole: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const updateUserRoles = (data) => (dispatch, getState) => {
  axios
    .put(apiEndPoint + "/" + data._id, {
      user: data.user,
      role: data.role,
      standard: data.standard,
      division: data.division,
      subject: data.subject,
      year: data.year,
    })
    .then((response) =>
      dispatch({
        type: actions.UPDATE_USERROLE,
        payload: { userRole: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const deleteUserRole = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.DELETE_USERROLE,
        payload: { userRole: response.data },
      })
    )
    .catch((err) => console.log(err));
};
