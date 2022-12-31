import React, { useEffect, useState, useCallback } from "react";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Field, useField } from "formik";
import { apiCallTry } from "../../axios";
import axios from "axios";
import { NOT_FOUND } from "../../Messages";

const MyAutocomplete2 = ({
  url,
  autocomplete,
  textfield,
  label,
  name,
  options,
}) => {
  const [data, setData] = useState({ data: [], links: [], meta: [] });
  const [typedtext, setTypedtext] = useState("");
  const [page, setPage] = useState(1);
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [bluredValue, setBluredValue] = useState("");

  useEffect(() => {
    setTypedtext(url?.initialtypedtext ?? "");
    setAutocompleteValue(url?.initialtypedtext ?? "");
  }, [url]);

  const getData = useCallback(async () => {
    if (url) {
      let the =
        url?.base[url?.base?.length - 1] === "&" ? url?.base : url?.base + "?";
      the += "page=" + page;
      the += typedtext !== "" ? "&" + url?.typedtext + "=" + typedtext : "";

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

  const [field] = useField({ name: name });

  useEffect(() => {
    if (!field.value && autocompleteValue) {
      setAutocompleteValue("");
      setTypedtext("");
    }
  }, [field]);

  useEffect(() => {
    if (bluredValue !== "" && bluredValue !== autocompleteValue) {
      setBluredValue("");
      setTypedtext(autocompleteValue);
    }
  }, [autocompleteValue, bluredValue]);

  return (
    <Field name={name}>
      {({ field, form }) => {
        const { onBlur, value } = field;
        const { getRequestValue, ...restAutocomplete } = autocomplete;
        const theOptions = options ?? data.data;

        return (
          <Autocomplete
            disableListWrap
            openOnFocus
            fullWidth
            blurOnSelect
            autoHighlight
            noOptionsText={NOT_FOUND}
            size="small"
            options={theOptions}
            onChange={(_, newValue) => {
              console.log(newValue);
              newValue === null && setTypedtext("");
              form.setFieldValue(name, getRequestValue(newValue) ?? "");
              setAutocompleteValue(restAutocomplete.getOptionLabel(newValue));
            }}
            onBlur={(e) => setBluredValue(e.target.value)}
            value={theOptions.find((e) => getRequestValue(e) === value) ?? null}
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

export default MyAutocomplete2;
