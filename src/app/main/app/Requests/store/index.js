import {combineReducers} from "@reduxjs/toolkit";
import Requests from "./slice";

const reducer = combineReducers({
    slice: Requests,
});

export default reducer;
