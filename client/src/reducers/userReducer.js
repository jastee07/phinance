import {
  GET_USER,
  CLEAR_CURRENT_USER,
  SET_SELECTED_USER
} from "../actions/types";

const initialState = {
  selectedUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
