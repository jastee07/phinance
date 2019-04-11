import axios from "axios";

import {
  SET_CURRENT_BUDGET,
  BUDGET_LOADING,
  CLEAR_CURRENT_BUDGET,
  GET_ERRORS
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

// Add Transaction to budget
export const addTransaction = (transData, bud_id, history) => dispatch => {
  axios
    .post(`/budget/${bud_id}/transactions`, transData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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

//Add Budget
export const addBudget = (budgetData, history) => dispatch => {
  axios
    .post("/api/organizations/budget", budgetData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
