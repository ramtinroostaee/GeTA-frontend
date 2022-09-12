import React from "react";
import {Field} from "formik";
import Checkbox from "@mui/material/Checkbox";
import {FormControl} from "@mui/material";
import clsx from "clsx";

const MyTextField = ({label, name, formcontrol, checkbox, ...rest}) => {
  return (
    <Field name={name}>
      {({field}) => (
        <FormControl
          className={clsx(
            formcontrol?.className ?? "",
            "flex flex-row items-center"
          )}
          fullWidth
          variant="outlined"
          {...formcontrol}
        >
          <Checkbox
            name={name}
            id={name}
            label={label}
            {...rest}
            {...checkbox}
            {...field}
          />
          <label htmlFor={name}>{label}</label>
        </FormControl>
      )}
    </Field>
  );
};

export default MyTextField;
