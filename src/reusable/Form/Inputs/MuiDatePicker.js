import React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Field } from "formik";
import { format, isValid } from "date-fns";

const MuiDatePicker = ({ label, name, className, datePicker, textField }) => (
  <Field name={name}>
    {({ field, form }) => {
      const { onBlur, value } = field;

      return (
        <DatePicker
          value={value}
          className={className}
          onBlur={onBlur}
          label={label}
          mask="____/__/__"
          onChange={(newValue) => {
            form.setFieldValue(
              name,
              isValid(newValue) ? format(newValue, "yyyy/MM/dd") : newValue
            );
          }}
          {...datePicker}
          renderInput={(params) => (
            <TextField
              // {...field}
              id={name}
              name={name}
              {...params}
              onBlur={onBlur}
              fullWidth
              helperText={form.touched[name] && form.errors[name]}
              error={form.touched[name] && Boolean(form.errors[name])}
              variant="outlined"
              {...textField}
            />
          )}
        />
      );
    }}
  </Field>
);

export default MuiDatePicker;
