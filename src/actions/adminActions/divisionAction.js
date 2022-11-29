import axios from "axios";
import * as actions from "../actionType";
import { toast } from "react-toastify";

const apiEndPoint = process.env.REACT_APP_API_URL + "divisions";
export const getAllDivisions = (data) => (dispatch) => {
  axios
    .post(apiEndPoint + "/pfs", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_DIVISIONS,
        payload: { divisions: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getCurrentDivision = (id) => (dispatch) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_DIVISION,
        payload: { division: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getTotalDivision = (data) => (dispatch, getState) => {
  axios.post(apiEndPoint + "/countdivision", data).then((response) => {
    console.log(response.data);
    dispatch({
      type: actions.GET_TOTAL_DIVISION,
      payload: { totalNoOfDivision: response.data },
    });
  });
};

export const addDivision = (data) => (dispatch, getState) => {
  const alreadyExist = (message) =>
    toast.error(message, {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });
  axios
    .post(apiEndPoint, data)
    .then((response) =>
      dispatch({
        type: actions.ADD_DIVISION,
        payload: { division: response.data },
      })
    )
    .catch((err) => {
      alreadyExist(err.response.data);
    });
};

export const updateDivision = (data) => (dispatch) => {
  axios
    .put(apiEndPoint + "/" + data._id, {
      division: data.division,
      standard: data.standard,
    })
    .then((response) =>
      dispatch({
        type: actions.UPDATE_DIVISION,
        payload: { division: response.data },
      })
    )
    .catch((err) => console.log(err));
};
export const deleteDivision = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.DELETE_DIVISION,
        payload: { division: response.data },
      })
    )
    .catch((err) => console.log(err));
};
