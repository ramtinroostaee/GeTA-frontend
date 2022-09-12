import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import {apiCallTry} from "reusable/axios";
import {No_Data_Found} from "reusable/Messages";

export const GetBills = createAsyncThunk(
  "PaymentMethod/Get",
  async (_, {getState}) => {
    const {sort, perPage, page, filters} = getState().PaymentMethod.slice;
    const url = `/api/stateWayBill/approvedCalculated?perPage=${perPage}&sort=${sort}&page=${page}${filters}`;
    const response = await apiCallTry(() => axios.get(url));
    if (response.data?.data.length === 0) toast.info(No_Data_Found);
    return response.data;
  }
);

export const EditBills = createAsyncThunk(
  "PaymentMethod/Edit",
  async ({values, id}) => {
    // const the = {};
    // Object.keys(values).forEach((e) => (the[e] = values[e].toString()));

    const response = await apiCallTry(() =>
      axios.put(`api/wayBill/${id}`, values)
    );

    if (response) {
      toast.success("ثبت شد");
    }

    return response.data;
  }
);

const initialState = {
  searchText: "",
  perPage: 10,
  sort: 23,
  page: 1,
  filters: "",
  links: {},
  meta: {},
  data: [],
  allChecked: false,
  routes: [],
};

const PaymentMethod = createSlice({
  name: "PaymentMethod",
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
    setPerPage: (state, action) => {
      state.perPage = action.payload;
      return state;
    },
    clearStore: () => _.cloneDeep(initialState),
    checkItem: (state, action) => {
      state.data[action.payload.index].checked = action.payload.checked;
      return state;
    },
    checkAll: (state, action) => {
      state.data.forEach((e) => {
        e.checked = action.payload.checked;
      });
      state.allChecked = action.payload.checked;
      return state;
    },
  },
  extraReducers: {
    [GetBills.fulfilled]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EditBills.fulfilled]: (state, action) => {
      const the = _.cloneDeep(state.data);
      const index = the.findIndex((e) => e.id === action.payload.id);
      the[index] = action.payload;

      return {...state, data: the};
    },
  },
});

export const {
  setSearchText,
  setPageConfig,
  setPerPage,
  clearStore,
  checkItem,
  checkAll,
} = PaymentMethod.actions;

export default PaymentMethod.reducer;
