import { Button, FormControl, Icon, Input } from "@mui/material";
import { FastField } from "formik";
import React from "react";
import clsx from "clsx";

const MyUpload = ({ label, name, accept, onChange, ...rest }) => (
  <FastField name={name}>
    {({ field, form }) => {
      const { value, ...restField } = field;
      // console.log(value);

      return (
        <FormControl
          variant="outlined"
          className={clsx(
            "flex flex-col justify-center",
            rest?.formcontrol?.className ?? ""
          )}
        >
          <label htmlFor={name}>
            <Input
              accept={accept ?? "image/*"}
              className="hidden"
              id={name}
              type="file"
              {...restField}
              onChange={(event) => {
                const formikHandle = () =>
                  form.setFieldValue(name, event.target.files[0]);
                onChange ? onChange(event, formikHandle) : formikHandle();
              }}
              {...rest}
            />
            <Button
              className="rounded-8 py-10 w-full"
              variant="outlined"
              component="span"
            >
              <Icon color="action">cloud_upload</Icon>
              {label ?? ""}
            </Button>
          </label>
          <div>{value?.name}</div>
        </FormControl>
      );
    }}
  </FastField>
);

export default MyUpload;
