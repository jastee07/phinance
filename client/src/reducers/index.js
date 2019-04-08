import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import orgReducer from "./orgReducer";

export default combineReducers({
  auth: authReducer,
  org: orgReducer,
  errors: errorReducer
});
