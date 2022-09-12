import {typeOnlyNumber} from "reusable/Form/FormCreate";
// import Typography from "@mui/material/Typography";

const grid = {className: "w-320"};

export const primaryFilters = [{
  label: "انتخاب مسیر", name: "route_id", type: "Autocomplete", url: {
    base: "/api/route", typedtext: "title",
  }, autocomplete: {
    isOptionEqualToValue: (option, value) => option.title === value.title,
    getOptionLabel: (option) => option?.title ?? "",
    getRequestValue: (value) => value?.id,
    renderOption: (props, option) => <li {...props}>{option.title}</li>,
  }, grid,
}, {
  label: "شماره بارنامه", name: "shomareh_barnameh", init: "", type: "TextField", textfield: {
    onKeyDown: typeOnlyNumber,
  }, grid,
}, {
  label: "کد ملی راننده اول", name: "firstdrivernationalid", init: "", type: "TextField", textfield: {
    onKeyDown: typeOnlyNumber,
  }, grid,
}, {
  label: "تاریخ صدور از", name: "tarikh_sodoor_from", init: "", type: "DatePicker", grid,
}, {
  label: "تاریخ صدور تا", name: "tarikh_sodoor_to", init: "", type: "DatePicker", grid,
}, // {
  //   label: "انتخاب نحوه پرداخت",
  //   name: "payment_method",
  //   init: "",
  //   type: "Select",
  //   options: [
  //     // { id: false, value: <em>None</em> },
  //     { id: "one", value: "one" },
  //     { id: "two", value: "two" },
  //   ], // validation: yup.string().required(FIELD_REQUIRED),
  //   grid,
  // },
];

export const secondaryFilters = [{
  label: "کد ملی گیرنده بار", name: "receivecode", init: "", type: "TextField", textfield: {
    onKeyDown: typeOnlyNumber,
  }, grid,
}, {
  label: "کد ملی فرستنده بار", name: "sendcode", init: "", type: "TextField", textfield: {
    onKeyDown: typeOnlyNumber,
  }, grid,
}, {
  label: "نام فرستنده", name: "sendname", init: "", type: "TextField", grid,
}, {
  label: "نام گیرنده", name: "receivename", init: "", type: "TextField", grid,
}, {
  label: "کد ملی راننده دوم", name: "seconddrivernationalid", init: "", type: "TextField", textfield: {
    onKeyDown: typeOnlyNumber,
  }, grid,
}, {
  label: "روش محاسبه کرایه",
  name: "paymentMethod",
  init: "",
  type: "Select",
  options: [{id: 1, value: "کرایه بارنامه"}, {id: 2, value: "تن مسیر"}, {
    id: 3, value: "توافقی",
  },],
  grid,
}, {
  label: "نام و نام خانوادگی راننده اول", name: "name_d1", init: "", type: "TextField", grid,
}, {
  label: "نام و نام خانوادگی راننده دوم", name: "name_d2", init: "", type: "TextField", grid,
}, {
  label: "کدپستی فرستنده", name: "sendposti", init: "", type: "TextField", textfield: {
    onKeyDown: typeOnlyNumber,
  }, grid,
}, {
  label: "کدپستی گیرنده", name: "receiveposti", init: "", type: "TextField", textfield: {
    onKeyDown: typeOnlyNumber,
  }, grid,
},];
