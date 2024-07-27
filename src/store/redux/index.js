import authReducer from "./authSice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  authReducer,
});
export default rootReducer;
