import {InputAdornment} from "@mui/material";

const grid = {xs: 12, md: 4};

export const form = [
  {
    label: "نام درس",
    name: "course",
    init: "",
    type: "Select",
    options: [],
    required: true,
    grid,
  },
  {
    label: "موضوع",
    name: "topic",
    init: "",
    type: "TextField",
    required: true,
    grid,
  },
  {
    label: "ایمیل",
    name: "email",
    init: "",
    type: "TextField",
    required: true,
    grid,
  },
  {
    label: "توضیحات",
    name: "description",
    init: "",
    type: "TextField",
    required: true,
    grid,
  },
  {
    label: "آیدی تلگرام",
    name: "telegram_id",
    init: "",
    type: "TextField",
    required: true,
    textfield: {
      style: {direction: "ltr"},
      InputProps: {
        startAdornment: <InputAdornment position="start">@</InputAdornment>,
      }
    },
    grid,
  },
];