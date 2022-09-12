import {FIELD_REQUIRED, INVALID_SHEBA} from "reusable/Messages";
import * as Yup from "yup";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";

const className = "w-1/2";
const grid = {xs: 6};

export const paymentMethod = [
  {
    label: "انتخاب نحوه پرداخت",
    name: "payWay",
    init: "1",
    type: "RadioGroup",
    radiogroup: {row: true, disabled: true},
    formcontrol: {required: true},
    options: [
      {
        id: "1",
        value: "از طریق آی بار",
        // , disabled: true
      },
      {
        id: "2",
        value: "خارج از آی بار",
        disabled: true,
      },
    ],
    grid,
  },
  {
    label: "انتخاب حساب مبدا",
    name: "ownerAccountId",
    init: "",
    type: "Select",
    validation: Yup.string().required(FIELD_REQUIRED),
    options: [],
    grid,
    formcontrol: {className, required: true},
  },
  {
    label: "استعلام موجودی(ریال)",
    name: "balance",
    init: "",
    type: "TextField",
    textfield: {
      disabled: true,
      className,
    },
    grid,
  },
  {
    label: "انتخاب راننده",
    name: "beneficiaryType",
    init: "",
    type: "RadioGroup",
    validation: Yup.string().required(FIELD_REQUIRED),
    radiogroup: {row: true},
    formcontrol: {required: true},
    options: [
      {id: "1", value: "راننده اول"},
      {id: "2", value: "راننده دوم"},
      {
        id: "3",
        value: "شخص ثالث",
      },
    ],
    grid,
  },
  {
    label: "نام و نام خانوادگی راننده",
    name: "thirdPartyName",
    init: "",
    validation: Yup.string().required(FIELD_REQUIRED),
    type: "TextField",
    textfield: {disabled: true, className, required: true},
    grid,
  },
  {
    label: "کد ملی راننده",
    name: "thirdPartyNationalCode",
    init: "",
    validation: Yup.number()
      .typeError("کد ملی باید عدد باشد")
      .required("کد ملی ضروری است")
      .correctNationalId("کد ملی صحیح نیست"),
    type: "TextField",
    textfield: {
      inputProps: {maxLength: 10},
      disabled: true,
      className,
      required: true,
    },
    grid,
  },
];

export const shebaPart = [
  {
    label: "انتخاب شبا",
    name: "beneficiaryBankAccountId",
    init: "",
    validation: Yup.string().required(FIELD_REQUIRED),
    options: [],
    grid,
    formcontrol: {className, required: true},
  },
  {
    label: "آیا شماره شبا پیش فرض باشد؟",
    name: "isDefaultSheba",
    init: "0",
    type: "RadioGroup",
    radiogroup: {row: true},
    formcontrol: {required: true},
    options: [
      {id: "1", value: "بله"},
      {id: "0", value: "خیر"},
    ],
    grid,
  },
];

export const thirdPersonSheba = [
  {
    label: "تصویر فایل تاییدیه اطلاعات شخص ثالث",
    name: "thirdPartyFile",
    init: "",
    type: "Upload",
    formcontrol: {className, required: true},
    grid,
  },
  {
    label:
      "واریز کرایه بر اساس اطلاعات شخص ثالث وارد شده مورد تایید راننده محترم می باشد.",
    name: "isOkay",
    init: false,
    type: "Checkbox",
    grid,
  },
];

export const driverSheba = [
  {
    label: "روش محاسبه شبا",
    name: "setNewShebaType",
    init: "1",
    type: "RadioGroup",
    radiogroup: {row: true},
    formcontrol: {required: true},
    options: [
      {id: "1", value: "درج شبا به صورت مستقیم"},
      {id: "2", value: "محاسبه شبا از طریق درج شماره حساب", disabled: true},
      {
        id: "3",
        value: "محاسبه  شبا از طریق شماره کارت",
        disabled: true,
      },
    ],
    grid: {xs: 12},
  },
  {
    label: "شماره شبا جدید",
    name: "newSheba",
    init: "",
    validation: Yup.string()
      .required(FIELD_REQUIRED)
      .correctSheba(INVALID_SHEBA),
    type: "TextField",
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <IconButton aria-label="IR_" className="w-48 h-48 text-18">
            IR_
          </IconButton>
        </InputAdornment>
      ),
    },
    textfield: {
      style: {direction: "ltr"},
      className,
      required: true,
      // type: "number",
      inputProps: {maxLength: 24},
    },
    grid: {xs: 6},
  },
  {
    label: "نام صاحب حساب",
    name: "shebaOwnerName",
    init: "",
    validation: Yup.string().required(FIELD_REQUIRED),
    type: "TextField",
    textfield: {disabled: true, className},
    grid: {xs: 6},
  },
];
