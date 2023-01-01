import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import {apiCallTry} from "reusable/axios";
import {No_Data_Found} from "../../../../../reusable/Messages";

export const GetOffers = createAsyncThunk(
  "Offers/Get",
  async (_, {getState}) => {
    const {sort, perPage, page, filters} = getState().Offers.slice;

    const url = `core/offer/`;

    const response = await apiCallTry(() => axios.get(url));
    const the = response.data?.response?.data?.length;
    if (the === 0) toast.info(No_Data_Found);
    return {offers: response.data?.response?.data};
  }
);

export const GetCourses = createAsyncThunk(
  "Offers/Get",
  async (_) => {
    const url = `core/course/`;

    const response = await apiCallTry(() => axios.get(url));
    return {
      courses: response?.data?.response?.data
    };
  }
);

export const CreateOffers = createAsyncThunk(
  "Offers/Create",
  async (formData, {dispatch}) => {
    const url = `core/offer/create/`;

    await apiCallTry(() => axios.post(url, formData));
    return dispatch(GetOffers());
  }
);

export const DestroyOffer = createAsyncThunk(
  "Offers/Create",
  async (id, {dispatch}) => {
    const url = `core/offer/destroy/${id}/`;

    await apiCallTry(() => axios.delete(url));
    return dispatch(GetOffers());
  }
);

const initialState = {
  searchText: "",
  perPage: 10,
  sort: 25,
  page: 1,
  offers: [],
  courses: [],
};

const Offers = createSlice({
  name: "Offers",
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
    [GetOffers.fulfilled]: (state, action) => ({
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
} = Offers.actions;

export default Offers.reducer;
