import {Form, Formik} from "formik";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TextField from "./Inputs/MyTextField";
import DatePicker from "./Inputs/MuiDatePicker";
import Autocomplete from "./Inputs/TheAutocomplete";
import Select from "./Inputs/MySelect";
import Upload from "./Inputs/MyUpload";
import Checkbox from "./Inputs/MyCheckbox";
import RadioGroup from "./Inputs/MyRadioGroup";
import * as yup from "yup";
import {Button, Grid} from "@mui/material";
// import {PatternFormat} from "react-number-format";
// import persianRex from "persian-rex";

export const Components = {
  DatePicker,
  TextField,
  Autocomplete,
  Select,
  Upload,
  Checkbox,
  RadioGroup,
};

export const mapCreateElement = ({type, grid = {}, ...element}) => {
  const TheComponent = Components[type];
  return (
    <Grid item {...grid} key={element.name}>
      <TheComponent {...element} />
    </Grid>
  );
};

export const createValidationInit = (inputData, ref) => {
  const initialValuess = {};
  const validationSchemas = {};
  const v = {};
  inputData.map((e) => {
    if (ref?.current?.values)
      v[e.name] = ref?.current?.values[e.name] ?? e.init ?? "";

    initialValuess[e.name] = e.init ?? "";
    validationSchemas[e.name] = e.validation;
  });
  if (ref?.current?.resetForm) ref?.current?.resetForm({values: v});

  return {initialValuess, validationSchemas: yup.object(validationSchemas)};
};

const FormCreate = forwardRef(
  ({inputData, onRefChange, onSubmit, grid = {}}, ref) => {
    const [oonSubmit, setOonSubmit] = useState();
    const [initialValues, setInitialValues] = useState();
    const [validationSchema, setValidationSchema] = useState();
    const [data, setData] = useState(inputData);

    useEffect(() => {
      if (inputData) {
        const {initialValuess, validationSchemas} = createValidationInit(
          inputData,
          ref
        );

        setInitialValues(initialValuess);
        setValidationSchema(validationSchemas);
        setData(
          inputData.map((e) => {
            const {validation, init, ...rest} = e;
            return rest;
          })
        );
      } else setInitialValues();
    }, [inputData]);

    useEffect(() => setOonSubmit(() => onSubmit), [onSubmit]);

    const RefChange = useCallback((node) => {
      if (typeof onRefChange === "function") {
        onRefChange(node);
      }

      if (node !== null) {
        ref.current = node;
      }
    }, []);

    const form = useMemo(() => {
      return (
        initialValues && (
          <Formik
            innerRef={RefChange}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              oonSubmit(values);
            }}
          >
            <Form className="w-full">
              <Grid container {...grid}>
                {data.map(mapCreateElement)}
              </Grid>

              <Button
                className="hidden"
                type="submit"
                id="hidden_submit_button_for_enter_events"
              >
                hidden submit button for enter events
              </Button>
            </Form>
          </Formik>
        )
      );
    }, [validationSchema, initialValues, data, oonSubmit]);

    useEffect(() => {
      if (form === undefined && ref?.current?.resetForm) {
        ref?.current?.resetForm({values: {}});
      }
    }, [form]);

    return <>{form}</>;
  }
);

export default FormCreate;

export const typeOnlyNumber = (event) => {
  if (event.code === "KeyC" || event.code === "KeyV" || event.code === "KeyA") {
    if (!event.ctrlKey) {
      event.preventDefault();
    }
  } else if (
    !(
      event.key === "Backspace" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft" ||
      event.key === "Enter" ||
      event.key === "Tab" ||
      /\d/.test(event.key) ||
      persianRex.number.test(event.key)
    )
  ) {
    event.preventDefault();
  }
};

// export const typePersianLetter = (event) => {
//   const persianRex = require("persian-rex");
//   if (
//     !(
//       event.key === "Backspace" ||
//       event.key === "ArrowRight" ||
//       event.key === "ArrowLeft" ||
//       event.key === "Enter" ||
//       event.key === "Tab" ||
//       event.key === " " ||
//       persianRex.letter.test(event.key)
//     )
//   ) {
//     event.preventDefault();
//   }
// };

// export const withOptionsAutoComplete = {
//   getOptionSelected: (option, value) => option.value === value.value,
//   getOptionLabel: (option) => option?.value ?? "",
//   getRequestValue: (value) => value?.id,
//   renderOption: (option) => (
//     <Typography variant="body1">{option.value}</Typography>
//   ),
// };

// export const NumberFormatCustom = ({ inputRef, ...rest }) => (
//   <PatternFormat
//     {...rest}
//     getInputRef={inputRef}
//     format="14##/## -- ######"
//     allowEmptyFormatting
//     mask="_"
//   />
// );
//
// export const PelakFormat = ({ inputRef, ...rest }) => (
//   <PatternFormat
//     {...rest}
//     getInputRef={inputRef}
//     format={"##" +  "ع" + "######"}
//     allowEmptyFormatting
//     mask="_"
//   />
// );
