import axios from "axios";
import * as actions from "../actionType";
import { toast } from "react-toastify";

const apiEndPoint = process.env.REACT_APP_API_URL + "grades";

export const getAllGrades = (data) => (dispatch) => {
  axios
    .post(apiEndPoint + "/pfs", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_GRADES,
        payload: { grades: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getCurrentGrade = (id) => (dispatch) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_GRADE,
        payload: { grade: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getTotalGrades = (data) => (dispatch, getState) => {
  axios.post(apiEndPoint + "/countgrades", data).then((response) =>
    dispatch({
      type: actions.GET_TOTAL_GRADES,
      payload: { totalNoOfGrades: response.data },
    })
  );
};

export const addGrade = (data) => (dispatch, getState) => {
  const alreadyExist = (message) =>
    toast.error(message, {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });

  axios
    .post(apiEndPoint, data)
    .then((response) =>
      dispatch({ type: actions.ADD_GRADE, payload: { grade: response.data } })
    )
    .catch((err) => {
      alreadyExist(err.response.data);
    });
};

export const updateGrade = (data) => (dispatch, getState) => {
  axios
    .put(apiEndPoint + "/" + data._id, {
      grade: data.grade,
      start: data.start,
      end: data.end,
    })
    .then((response) =>
      dispatch({
        type: actions.UPDATE_GRADE,
        payload: { grade: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const deleteGrade = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.DELETE_GRADE,
        payload: { grade: response.data },
      })
    )
    .catch((err) => console.log(err));
};
