import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Slide,
} from "@material-ui/core";
import React, { useRef } from "react";
import FormCreate from "reusable/Form/FormCreate";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
  },
}));

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialog = ({ open, handleClose, title, ...rest }) => {
  const classes = useStyles();
  const FormikRef = useRef();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      onClose={() => {}}
      aria-describedby="alert-dialog-slide-description"
      className="flex flex-col md:overflow-hidden"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {title ?? "ویرایش"}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              handleClose();
              FormikRef.current?.resetForm();
            }}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <FormCreate className="flex-col" ref={FormikRef} {...rest} />
      </DialogContent>
      <DialogActions className="justify-around mb-8">
        <Button
          className="rounded-8 min-w-96"
          variant="contained"
          color="secondary"
          onClick={() => FormikRef?.current?.handleSubmit()}
        >
          ثبت
        </Button>
        <Button
          className="rounded-8 min-w-96"
          variant="contained"
          autoFocus
          onClick={() => {
            handleClose();
            FormikRef.current?.resetForm();
          }}
        >
          انصراف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const WrapperD = ({ open, handleClose, title, children, ...rest }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="md"
      fullWidth
      onClose={() => {}}
      aria-describedby="alert-dialog-slide-description"
      {...rest}
    >
      <AppBar className="mb-16" position="static" elevation={0}>
        <Toolbar className="flex w-full justify-between">
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
          <IconButton color="inherit" aria-label="close" onClick={handleClose}>
            <Icon>close</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>{children}</DialogContent>
      <DialogActions className="mb-8 justify-center mr-16">
        <Button
          className="px-40 w-98 rounded-8"
          variant="contained"
          autoFocus
          onClick={handleClose}
        >
          انصراف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
