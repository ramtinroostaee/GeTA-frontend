import {combineReducers} from "@reduxjs/toolkit";
import Offers from "./slice";

const reducer = combineReducers({
    slice: Offers,
});

export default reducer;
