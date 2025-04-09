import { combineReducers } from "redux";
import taskReducer from "./formSlice";

//represents the root reducer, which combines all the individual reducers in the application.
const rootReducer  = combineReducers({
    tasks: taskReducer
})

export default rootReducer;