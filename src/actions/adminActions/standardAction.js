import * as actions from "../actionType";
import axios from "axios";
import { toast } from "react-toastify";

const apiEndPoint = process.env.REACT_APP_API_URL + "standards";

export const getAllStandards = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/pfs", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_STANDARDS,
        payload: { standards: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getCurrentStandard = (id) => (dispatch) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) => {
      dispatch({
        type: actions.GET_CURRENT_STANDARD,
        payload: { standard: response.data },
      });
    })
    .catch((err) => console.log(err));
};

export const getTotalStandard = (data) => (dispatch, getState) => {
  axios.post(apiEndPoint + "/countstandard", data).then((response) =>
    dispatch({
      type: actions.GET_TOTAL_STANDARD,
      payload: { totalNoOfStandard: response.data },
    })
  );
};

export const addStandard = (data) => (dispatch, getState) => {
  const alreadyExist = (message) =>
    toast.error(message, {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });

  axios
    .post(apiEndPoint, data)
    .then((response) => {
      dispatch({
        type: actions.ADD_STANDARD,
        payload: { standard: response.data },
      });
    })
    .catch((err) => {
      alreadyExist(err.response.data);
    });
};

export const updateStandard = (data) => (dispatch) => {
  axios
    .put(apiEndPoint + "/" + data._id, { standard: data.standard })
    .then((response) =>
      dispatch({
        type: actions.UPDATE_STANDARD,
        payload: { standard: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const deleteStandard = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.DELETE_STANDARD,
        payload: { standard: response.data },
      })
    )
    .catch((err) => console.log(err));
};
