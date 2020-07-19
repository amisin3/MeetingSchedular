import { combineReducers } from "redux";
import meeting from "./meeting";
import alert from "./alert";

export default combineReducers({
  meeting,
  alert,
});
