import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button, Paper } from "@mui/material";
import FormCreate from "./FormCreate";

const FormTest = () => {
  const FormikRef = useRef();

  const onRefChange = useCallback((node) => {
    if (node === null) {
      // console.log("node unmounted");
      // DOM node referenced by ref has been unmounted
    } else {
      // if (value?.mobile !== node.values?.mobile) {
      //   console.log("in");
      //   setValue(node.values.mobile);
      // }
      // DOM node referenced by ref has changed and exists
    }
  }, []); // adjust deps

  const formData = useMemo(
    () => [
      {
        name: "title",
        label: "رنگ",
        init: "red",
        type: "Select",
        className: "m-10 w-128",
        options: [
          { id: "", value: <em>None</em> },
          { id: "blue", value: "Blue" },
          { id: "red", value: "Red" },
          { id: "green", value: "Green" },
        ],
        // afterinput: {
        //   blue: [
        //     {
        //       name: "mobile",
        //       label: "شماره تلفن",
        //       init: "",
        //       type: "TextField",
        //       className: "m-10 max-w-256",
        //     },
        //   ],
        // },
      },
      {
        label: "تیک زدن به جای selectbox که فضای کمتری دارد",
        name: "test",
        init: false,
        type: "Checkbox",
      },
      {
        name: "loadedAt",
        label: "تاریخ ثبت قرارداد:",
        init: "2022-06-22",
        type: "DatePicker",
        datePicker: {
          containerClassName: "m-10 max-w-256",
        },
      },
    ],
    []
  );

  return (
    <Paper elevation={0} className="p-12 my-20">
      <div className="flex items-center justify-center flex-wrap w-full">
        <FormCreate
          className="flex-wrap w-full"
          onSubmit={() => {}}
          inputData={formData}
          ref={FormikRef}
          onRefChange={onRefChange}
        />
        <Button
          variant="contained"
          className="rounded-6 min-w-96 mt-6"
          color="secondary"
          onClick={() => FormikRef?.current?.handleSubmit()}
        >
          ثبت
        </Button>
      </div>
    </Paper>
  );
};

export default FormTest;
