import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { SURE_TO_DELETE } from "../Messages";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ open, setOpen, handleDelete, title }) => {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog
      style={{ zIndex: "99999" }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      // onClose={handleClose}
      onClose={() => {}}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="mx-20">
        {title ? title : SURE_TO_DELETE}
      </DialogTitle>
      <DialogActions className="justify-around mb-8">
        <Button
          className="rounded-8"
          variant="contained"
          color="secondary"
          onClick={handleDelete}
        >
          بله
        </Button>
        <Button
          className="rounded-8"
          variant="contained"
          autoFocus
          onClick={handleClose}
        >
          خیر
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
