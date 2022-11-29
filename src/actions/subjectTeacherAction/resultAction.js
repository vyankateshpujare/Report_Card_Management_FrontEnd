import * as actions from "../actionType";
import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL + "testresults";

export const getAllTestResults = (id, student) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/allresults", { userId: id, student })
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_TEST_RESULTS,
        payload: { results: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const addTestResult = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data)
    .then((response) =>
      dispatch({
        type: actions.ADD_RESULT,
        payload: { result: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const deleteTestResult = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.DELETE_RESULT,
        payload: { result: response.data },
      })
    )
    .catch((err) => console.log(err));
};
