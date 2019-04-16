import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import orgReducer from "./orgReducer";
import budgetReducer from "./budgetReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  org: orgReducer,
  budget: budgetReducer,
  user: userReducer,
  errors: errorReducer
});
