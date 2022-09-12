import React, {forwardRef} from "react";
import {Button, Paper} from "@mui/material";
import FormCreate from "../FormCreate";

const SimpleForm = forwardRef((props, ref) => {
  const {button, ...rest} = props;
  console.log(rest);

  return (
    <>
      <FormCreate
        grid={{spacing: 4, className: "justify-center"}}
        ref={ref}
        {...rest}
      />
      <Button
        variant="contained"
        className="rounded-6 min-w-96 mt-32"
        color="secondary"
        onClick={() => ref?.current?.handleSubmit()}
      >
        {button}
      </Button>
    </>
  );
});

export default SimpleForm;
