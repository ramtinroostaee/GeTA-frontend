import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import {apiCallTry} from "reusable/axios";
import {No_Data_Found} from "../../../../../reusable/Messages";

export const GetRequests = createAsyncThunk(
  "Requests/Get",
  async (_, {getState}) => {
    const {sort, perPage, page, filters} = getState().Requests.slice;

    const url = `core/request/`;

    const response = await apiCallTry(() => axios.get(url));
    const the = response.data?.response?.data?.length;
    if (the === 0) toast.info(No_Data_Found);
    return {requests: response.data?.response?.data};
  }
);

export const GetCourses = createAsyncThunk(
  "Requests/Get",
  async (_) => {
    const url = `core/course/`;

    const response = await apiCallTry(() => axios.get(url));
    return {
      courses: response?.data?.response?.data
    };
  }
);

export const CreateRequests = createAsyncThunk(
  "Requests/Create",
  async (formData, {dispatch}) => {
    const url = `core/request/create/`;

    await apiCallTry(() => axios.post(url, formData));
    return dispatch(GetRequests());
  }
);

export const DestroyRequest = createAsyncThunk(
  "Requests/Create",
  async (id, {dispatch}) => {
    const url = `core/request/destroy/${id}/`;

    await apiCallTry(() => axios.delete(url));
    return dispatch(GetRequests());
  }
);

const initialState = {
  searchText: "",
  perPage: 10,
  sort: 25,
  page: 1,
  requests: [],
  courses: [],
};

const Requests = createSlice({
  name: "Requests",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({payload: event.target.value || ""}),
    },
    setPageConfig: (state, action) => {
      return {...state, ...action.payload};
    },
    clearStore: () => _.cloneDeep(initialState),
  },
  extraReducers: {
    [GetRequests.fulfilled]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [GetCourses.fulfilled]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  setSearchText,
  setPageConfig,
  clearStore,
} = Requests.actions;

export default Requests.reducer;
