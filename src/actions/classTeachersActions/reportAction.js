import axios from "axios";
import * as actions from "../actionType";

const apiEndPoint = process.env.REACT_APP_API_URL + "reports";

export const getAllReports = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/pfs", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_REPORTS,
        payload: { reports: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const generateReport = (id, data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/" + id, data)
    .then((response) =>
      dispatch({
        type: actions.ADD_REPORT,
        payload: { report: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const totalReports = () => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/countreports")
    .then((response) =>
      dispatch({
        type: actions.GET_TOTAL_REPORTS,
        payload: { totalReports: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const addRemark = (data, id) => (dispatch, getState) => {
  axios
    .patch(apiEndPoint + "/" + id, { remark: data })
    .then((response) =>
      dispatch({
        type: actions.ADD_REMARK,
        payload: { report: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const sendReport = (id) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/sendreport", { id })
    .then((response) =>
      dispatch({
        type: actions.SEND_REPORT,
      })
    )
    .catch((err) => console.log(err));
};

export const deleteReport = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint +"/"+ id)
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: actions.DELETE_REPORT,
        payload: { report: response.data },
      });
    })
    .catch((err) => console.log(err));
};
