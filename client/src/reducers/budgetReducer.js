import { SET_CURRENT_BUDGET, BUDGET_LOADING } from "../actions/types";

const initialState = {
  budget: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_BUDGET:
      return {
        ...state,
        budget: action.payload,
        loading: false
      };
    case BUDGET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
