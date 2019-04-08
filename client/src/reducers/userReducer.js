import { GET_USER, CLEAR_CURRENT_USER } from "../actions/types";

const initialState = {
  profile: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
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
