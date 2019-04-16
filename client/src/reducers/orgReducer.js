import { GET_ORGANIZATION, ORGANIZATION_LOADING } from "../actions/types";

const initialState = {
  organization: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
        loading: false
      };
    case ORGANIZATION_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
