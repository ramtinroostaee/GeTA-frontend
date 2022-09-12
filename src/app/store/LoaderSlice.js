import { createSlice } from "@reduxjs/toolkit";

const LoaderSlice = createSlice({
  name: "Loader",
  initialState: {
    isLoading: 0,
  },
  reducers: {
    showLoader: ({ isLoading }) => {
      return { isLoading: isLoading + 1 };
    },
    hideLoader: ({ isLoading }) => {
      return { isLoading: isLoading - 1 };
    },
  },
});

export const { showLoader, hideLoader } = LoaderSlice.actions;

export default LoaderSlice.reducer;
