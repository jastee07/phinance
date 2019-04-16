import axios from "axios";

import { GET_USER, CLEAR_CURRENT_USER, SET_SELECTED_USER } from "./types";

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

// Clear profile
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER
  };
};
