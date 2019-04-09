import axios from "axios";

import {
  SET_CURRENT_BUDGET,
  BUDGET_LOADING,
  CLEAR_CURRENT_BUDGET
} from "./types";

// Get current organization
export const setCurrentBudget = id => dispatch => {
  dispatch(setBudgetLoading());
  axios
    .get(`/api/organizations/budget/${id}`)
    .then(res =>
      dispatch({
        type: SET_CURRENT_BUDGET,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Profile loading
export const setBudgetLoading = () => {
  return {
    type: BUDGET_LOADING
  };
};

// Clear profile
export const clearCurrentBudget = () => {
  return {
    type: CLEAR_CURRENT_BUDGET
  };
};
