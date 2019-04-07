import axios from "axios";

import { GET_USER, CLEAR_CURRENT_USER } from "./types";

// Get current profile
export const getCurrentUser = () => dispatch => {
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: {}
      })
    );
};

// Clear profile
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER
  };
};
