import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { FastField } from "formik";

export default function MyAutocomplete({
  data,
  getNext,
  hasNext,
  autocomplete,
  textfield,
  label,
  name,
  className,
}) {
  const [DisplayOptions, setDisplayOptions] = useState([]);
  const { renderTheOption, ...restAutocomplete } = autocomplete;

  useEffect(() => {
    const theData = hasNext
      ? [...data, { label: "loading more ...", isLast: true }]
      : data;
    setDisplayOptions(theData);
  }, [hasNext, data]);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("jason");
          getNext();
        }
      });
      if (node) observer.current.observe(node);
    },
    [getNext]
  );

  return (
    <FastField name={name}>
      {({ field, form }) => (
        <Autocomplete
          disableListWrap
          openOnFocus
          fullWidth
          blurOnSelect
          // open={!!DisplayOptions.length}
          className={className}
          options={DisplayOptions}
          filterOptions={(x) => x}
          // getOptionLabel={(option) => option?.label ?? option}
          onChange={(_, newValue) => {
            console.log(newValue);
            form.setFieldValue(
              name,
              restAutocomplete.getOptionLabel(newValue) ?? ""
            );
          }}
          {...restAutocomplete}
          renderOption={(option) =>
            option?.isLast ? (
              <span ref={lastBookElementRef}>{option.label}</span>
            ) : (
              renderTheOption(option)
            )
          }
          renderInput={(params) => (
            <TextField
              id={name}
              name={name}
              label={label}
              helperText={form.touched[name] && form.errors[name]}
              error={form.touched[name] && Boolean(form.errors[name])}
              variant="outlined"
              fullWidth
              {...field}
              {...params}
              {...textfield}
            />
          )}
        />
      )}
    </FastField>
  );
}
