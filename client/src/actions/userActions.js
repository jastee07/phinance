import axios from "axios";

import { GET_USER, CLEAR_CURRENT_USER, SET_CURRENT_USER } from "./types";

// Get current profile
export const getCurrentUser = () => dispatch => {
  axios
    .get("/api/user")
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

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Clear profile
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER
  };
};
