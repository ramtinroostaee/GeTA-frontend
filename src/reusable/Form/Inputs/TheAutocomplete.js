import React, {useEffect, useState, useCallback} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {Field} from "formik";
import {apiCallTry} from "../../axios";
import axios from "axios";

const MyAutocomplete = ({url, autocomplete, textfield, label, name}) => {
  const [data, setData] = useState({data: [], links: [], meta: []});
  const [typedtext, setTypedtext] = useState("");
  const [page, setPage] = useState(1);
  const [autocompleteValue, setAutocompleteValue] = useState("");
  console.log(data.data)

  const getData = useCallback(async () => {
    if (url) {
      let the = url?.base + "?";
      the += typedtext !== "" ? url?.typedtext + "=" + typedtext : "";
      the += "&page=" + page;

      const response = await apiCallTry(() => axios.get(the));

      if (response) {
        setData(response?.data);
      }
    }
  }, [url, page, typedtext]);

  useEffect(() => {
    const withDelay = setTimeout(() => {
      getData();
    }, 300);

    return () => clearTimeout(withDelay);
  }, [getData]);

  return (
    <Field name={name}>
      {({field, form}) => {
        const {onBlur} = field;
        const {getRequestValue, ...restAutocomplete} = autocomplete;

        return (
          <Autocomplete
            disableListWrap
            openOnFocus
            fullWidth
            blurOnSelect
            autoHighlight
            options={data.data}
            filterOptions={(x) => x}
            onChange={(_, newValue) => {
              newValue === null && setTypedtext("");
              form.setFieldValue(name, getRequestValue(newValue) ?? "");
              setAutocompleteValue(restAutocomplete.getOptionLabel(newValue));
            }}
            onBlur={(e) =>
              e.target.value !== autocompleteValue &&
              setTypedtext(autocompleteValue)
            }
            {...restAutocomplete}
            renderInput={(params) => (
              <TextField
                id={name}
                name={name}
                label={label}
                helperText={form.touched[name] && form.errors[name]}
                error={form.touched[name] && Boolean(form.errors[name])}
                variant="outlined"
                fullWidth
                onChange={(e) => setTypedtext(e.target.value)}
                onBlur={onBlur}
                {...params}
                {...textfield}
              />
            )}
          />
        );
      }}
    </Field>
  );
};
export default MyAutocomplete;
