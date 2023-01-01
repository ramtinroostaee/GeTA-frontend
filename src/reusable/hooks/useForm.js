import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {Form, Formik} from "formik";
import {Button} from "@mui/material";
import * as yup from "yup";

export const createValidationInit = (inputData, ref) => {
  const initialValuess = {};
  const validationSchemas = {};
  inputData.map((e) => {
    initialValuess[e.name] = e.init ?? "";
    validationSchemas[e.name] = e.validation;
  });

  if (ref?.current?.values) {
    ref.current.initialValues = initialValuess;
    Object.keys(initialValuess).forEach((e) => {
      if (!Object.keys(ref?.current?.values)?.includes(e)) {
        ref.current.values[e] = initialValuess[e];
      }
      Object.keys(ref?.current?.values);
    });

    Object.keys(ref?.current?.values)?.forEach((e) => {
      if (!Object.keys(initialValuess)?.includes(e)) {
        delete ref?.current?.values[e];
      }
    });
  }
  return {initialValuess, validationSchemas: yup.object(validationSchemas)};
};

const useForm = ({inputData, onRefChange, onSubmit, ref = useRef()}) => {
  const [initialValues, setInitialValues] = useState();
  const [validationSchema, setValidationSchema] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (inputData) {
      const dataClone = _.cloneDeep(inputData);
      const {initialValuess, validationSchemas} = createValidationInit(
        dataClone,
        ref
      );

      setInitialValues(initialValuess);
      setValidationSchema(validationSchemas);
      setData(
        dataClone.map((e) => {
          const {validation, init, ...rest} = e;
          return rest;
        })
      );
    } else setInitialValues();
  }, [inputData]);

  const RefChange = useCallback((node) => {
    if (typeof onRefChange === "function") {
      onRefChange(node);
    }

    if (node !== null) {
      ref.current = node;
    }
  }, []);

  const FormWrap = useMemo(
    () =>
      ({children, className}) =>
        (
          <Formik
            innerRef={RefChange}
            initialValues={ref?.current?.values ?? initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              onSubmit(values);
            }}
          >
            <Form className={className}>
              {children}

              <Button className="hidden" type="submit" id="hiddenSubmit">
                hidden submit button for enter events
              </Button>
            </Form>
          </Formik>
        ),
    [validationSchema, initialValues, onSubmit, RefChange]
  );

  return {
    FormWrap,
    ref,
    data,
  };
};

export default useForm;
