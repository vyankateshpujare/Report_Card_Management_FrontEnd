import * as actions from "../actionType";
import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "students";

export const getAllStudents = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/allstudents", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_STUDENTS,
        payload: { students: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const getCurrentStudent = (id) => (dispatch, getState) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_STUDENT,
        payload: { student: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const addStudent = (id, data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: actions.ADD_STUDENT,
        payload: { student: response.data },
      });
    })
    .catch((err) => console.log(err.message));
};

export const updateStudent = (userId, data) => (dispatch, getState) => {
  axios
    .put(apiEndPoint + "/" + data._id + "/" + userId, {
      rollNumber: data.rollNumber,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      standard: data.standard,
      division: data.division,
      dob: data.dob,
      parents: data.parents,
    })
    .then((response) =>
      dispatch({
        type: actions.UPDATE_STUDENT,
        payload: { student: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const deleteStudent = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.DELETE_STUDENT,
        payload: { student: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};
