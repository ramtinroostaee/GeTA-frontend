import React from "react";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persianCalender from "react-date-object/calendars/persian";
import persian from "react-date-object/locales/persian_fa";
import {Icon, TextField} from "@mui/material";
import {Field} from "formik";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import gregorian from "react-date-object/calendars/gregorian";
import InputAdornment from "@mui/material/InputAdornment";
import {digitsFaToEn} from "@persian-tools/persian-tools";

// export const p2e = (s) => {
//   try {
//     return s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
//   } catch (e) {
//     return s;
//   }
// };

const MyDatePicker = ({label, name, datePicker, textField, disabled}) => (
  <Field name={name}>
    {({field, form}) => (
      <DatePicker
        disabled={disabled ?? false}
        id={name}
        name={name}
        format="YYYY/MM/DD"
        value={field.value ? new DateObject(field.value) : ""}
        onChange={(element) => {
          const the = new DateObject(element);
          the.convert(gregorian);
          form.setFieldValue(name, digitsFaToEn(the.format("YYYY-MM-DD")));
        }}
        render={(value, openCalendar) => (
          <TextField
            onFocus={openCalendar}
            label={label}
            helperText={form.touched[name] && form.errors[name]}
            error={form.touched[name] && Boolean(form.errors[name])}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-gray">event</Icon>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
            value={value}
            disabled={disabled ?? false}
            {...textField}
          />
        )}
        animations={[
          opacity(),
          transition({
            from: 40,
            transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
          }),
        ]}
        calendar={persianCalender}
        locale={persian}
        {...datePicker}
      />
    )}
  </Field>
);

export default MyDatePicker;
