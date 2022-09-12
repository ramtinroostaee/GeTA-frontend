import {combineReducers} from "@reduxjs/toolkit";
import PaymentMethodSlice from "./slice";

const reducer = combineReducers({
  slice: PaymentMethodSlice,
});

export default reducer;
