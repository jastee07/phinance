import { GET_ORGANIZATION } from "../actions/types";

const initialState = {
  organization: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANIZATION:
      console.log(action.payload);

      return {
        ...state,
        organization: action.payload
      };
    default:
      return state;
  }
}
