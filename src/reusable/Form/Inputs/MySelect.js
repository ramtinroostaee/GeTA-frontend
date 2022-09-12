import React from "react";
import { Field } from "formik";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";

const MySelect = (props) => {
  const {
    label,
    name,
    options,
    afterinput,
    className,
    formcontrol,
    select,
    disabled,
    ...rest
  } = props;

  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl
          disabled={disabled}
          className={className}
          fullWidth
          variant="outlined"
          {...formcontrol}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            name={name}
            id={name}
            label={label}
            error={form.touched[name] && Boolean(form.errors[name])}
            {...rest}
            {...field}
            fullWidth
            onChange={(event) => form.setFieldValue(name, event.target.value)}
            {...select}
          >
            {options?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText style={{ color: "#F44336" }}>
            {form.touched[name] && form.errors[name]}
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
};

export default MySelect;
