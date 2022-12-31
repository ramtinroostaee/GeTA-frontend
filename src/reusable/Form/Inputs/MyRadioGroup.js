import React from "react";
import { FastField } from "formik";
import {
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

const MyRadioGroup = (props) => {
  const { label, name, options, className, radiogroup, formcontrol, disabled,...rest } =
    props;

  return (
    <FastField name={name}>
      {({ field, form }) => (
        <FormControl disabled={disabled} size="small" fullWidth variant="outlined" {...formcontrol}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            size="small"
            row={radiogroup?.row ?? false}
            aria-labelledby="row-radio-buttons-group-label"
            name={name}
            id={name}
            label={label}
            onChange={(event) => {
              form.setFieldValue(name, event.target.value);
            }}
            {...rest}
            {...field}
            {...radiogroup}
          >
            {options?.map((item) => {
              const { id, value, ...radio } = item;
              return (
                <FormControlLabel
                  value={id}
                  key={id}
                  control={<Radio />}
                  label={value}
                  {...radio}
                />
              );
            })}
          </RadioGroup>
          <FormHelperText style={{ color: "#F44336" }}>
            {form.touched[name] && form.errors[name]}
          </FormHelperText>
        </FormControl>
      )}
    </FastField>
  );
};

export default MyRadioGroup;
