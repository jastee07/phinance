import axios from "axios";

import { GET_ORGANIZATION, CLEAR_CURRENT_ORGANIZATION } from "./types";

// Get current profile
export const getCurrentOrg = (orgId) => dispatch => {
    axios
        .get("/api/organizations/:id")
        .then(res =>
            dispatch({
                type: GET_ORGANIZATION,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ORGANIZATION,
                payload: {}
            })
        );
};

// Clear profile
export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_ORGANIZATION
    };
};
