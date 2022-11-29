import axios from "axios";
import * as actions from "../actionType";

const apiEndPoint = process.env.REACT_APP_API_URL + "subjects";

export const getAllSubjects = () => (dispatch, getState) => {
  axios
    .get(apiEndPoint)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_SUBJECTS,
        payload: { subjects: response.data },
      })
    )
    .catch((err) => console.log(err));
};
