import * as actions from "../actionType";
import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "tests";

export const getAllTest = () => (dispatch, getState) => {
  axios
    .get(apiEndPoint)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_TESTS,
        payload: { tests: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getAllTests = (id, testName) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/alltests", { userId: id, testName })
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_TESTS,
        payload: { tests: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const getCurrentTest = (id) => (dispatch, getState) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_TEST,
        payload: { test: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const addTest = (id, data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/" + id, data)
    .then((response) =>
      dispatch({
        type: actions.ADD_TEST,
        payload: { test: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const updateTest = (data) => (dispatch, getState) => {
  axios
    .patch(apiEndPoint + "/" + data._id, {
      testName: data.testName,
      totalMarks: data.totalMarks,
      year: data.year,
    })
    .then((response) =>
      dispatch({
        type: actions.UPDATE_TEST,
        payload: { test: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const deleteTest = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.DELETE_TEST,
        payload: { test: response.data },
      })
    )
    .catch((err) => console.log(err));
};
