import axios from "axios";

import {
  GET_ORGANIZATION,
  CLEAR_CURRENT_ORGANIZATION,
  ORGANIZATION_LOADING
} from "./types";

// Get current profile
export const getCurrentOrg = () => dispatch => {
  dispatch(setOrganizationLoading());
  axios
    .get("/api/organizations")
    .then(res =>
      dispatch({
        type: GET_ORGANIZATION,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Profile loading
export const setOrganizationLoading = () => {
  return {
    type: ORGANIZATION_LOADING
  };
};

// Clear profile
export const clearCurrentOrganization = () => {
  return {
    type: CLEAR_CURRENT_ORGANIZATION
  };
};
