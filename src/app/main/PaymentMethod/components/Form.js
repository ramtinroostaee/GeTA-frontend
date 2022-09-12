import { Formik, Form } from "formik";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, Grid } from "@mui/material";
import {
  Components,
  createValidationInit,
  mapCreateElement,
} from "reusable/Form/FormCreate";
import FieldsetLegend from "reusable/UI/FieldsetLegend";

const TheForm = forwardRef(
  ({ shebaCalc, inputData, onRefChange, onSubmit, grid = {} }, ref) => {
    const [oonSubmit, setOonSubmit] = useState();
    const [initialValues, setInitialValues] = useState();
    const [validationSchema, setValidationSchema] = useState();
    const [data, setData] = useState(inputData);

    useEffect(() => {
      if (inputData) {
        const { initialValuess, validationSchemas } = createValidationInit(
          inputData,
          ref
        );

        setInitialValues(initialValuess);
        setValidationSchema(validationSchemas);
        setData(
          inputData.map((e) => {
            const { validation, init, ...rest } = e;
            return rest;
          })
        );
      } else {
        setInitialValues();
        setValidationSchema();
        setData();
        ref?.current?.resetForm({ values: {} });
      }
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

    const sheba_field = useCallback(
      ({ type, grid = {}, ...element }) => {
        const TheComponent = Components[type];
        return (
          <Grid item {...grid} className="flex items-start">
            <TheComponent {...element} />
            <Button
              className="rounded-6 p-8 mx-8"
              variant="contained"
              color="secondary"
              onClick={shebaCalc}
              id="shebaCalc"
            >
              محاسبه شبا
            </Button>
          </Grid>
        );
      },
      [shebaCalc]
    );

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
              <FormWrapper title={"انتخاب نحوه پرداخت"}>
                {mapCreateElement(data[0])}
              </FormWrapper>

              <FormWrapper title={"واریز از مبدا"}>
                {mapCreateElement(data[1])}
                {mapCreateElement(data[2])}
              </FormWrapper>

              <FormWrapper title={"واریز به مقصد"}>
                {mapCreateElement(data[3])}
              </FormWrapper>

              <FormWrapper>
                {mapCreateElement(data[4])}
                {mapCreateElement(data[5])}
                {mapCreateElement(data[6])}
                {mapCreateElement(data[7])}
              </FormWrapper>

              {data.length > 8 && (
                <FormWrapper title="محاسبه شبا جدید راننده">
                  {mapCreateElement(data[8])}
                  {sheba_field(data[9])}
                  {mapCreateElement(data[10])}
                </FormWrapper>
              )}

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

    return <>{form}</>;
  }
);

const FormWrapper = ({ children, title }) => (
  <FieldsetLegend className="my-16" title={title}>
    <Grid container spacing={2}>
      {children}
    </Grid>
  </FieldsetLegend>
);

export default TheForm;
