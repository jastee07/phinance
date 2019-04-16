import axios from "axios";

import {
  GET_USER,
  CLEAR_CURRENT_USER,
  SET_SELECTED_USER,
  GET_ERRORS
} from "./types";

// Get current profile
export const getCurrentUser = () => dispatch => {
  // axios
  //   .get("/api/user")
  //   .then(res =>
  //     dispatch({
  //       type: GET_USER,
  //       payload: res.data
  //     })
  //   )
  //   .catch(err =>
  //     dispatch({
  //       type: GET_USER,
  //       payload: {}
  //     })
  //   );
};

// Set logged in user
export const setUserToEdit = memberData => {
  return {
    type: SET_SELECTED_USER,
    payload: memberData
  };
};

// Add Transaction to budget
export const editMember = (mem_id, memData, history) => dispatch => {
  axios
    .put(`/api/users/${mem_id}`, memData)
    .then(res => history.push("/members"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clear profile
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER
  };
};
