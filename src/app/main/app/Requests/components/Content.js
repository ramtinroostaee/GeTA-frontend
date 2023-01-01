import {forwardRef, useCallback, useMemo, useState} from "react";
import Card from '@mui/material/Card';
import {motion} from 'framer-motion';
import {CardMedia, Grid, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import useForm from "reusable/hooks/useForm";
import {CreateRequests, DestroyRequest} from "../store/slice";
import {form} from "../array/form";
import {mapCreateElement} from "../../../../../reusable/Form/FormCreate";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

const selectMaker = (data) =>
  createSelector(
    ({Requests}) => Requests.slice[data],
    (data) => data
  );

const avatars = ['big-ears-neutral', 'big-smile', 'croodles-neutral', 'initials', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art'];

const App = () => {
  const requests = useSelector(selectMaker("requests"));
  const courses = useSelector(selectMaker("courses"));
  const userId = useSelector(({auth}) => auth?.user?.data?.pk);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const inputData = useMemo(() => {
    const the = _.cloneDeep(form);

    the[0].options = courses?.map((e) => ({id: e.id, value: e.name}));

    return the;
  }, [courses]);

  const onSubmit = useCallback((values) => {
    dispatch(CreateRequests(values)).then(() => setOpen(false));
  }, []);

  const {data, FormWrap, ref} = useForm({
    inputData,
    onSubmit,
  });

  const Form = useMemo(() => {
    return (
      data.length && (
        <FormWrap className="pb-8">
          <Grid container spacing={2}>
            {data.map(mapCreateElement)}
          </Grid>
        </FormWrap>
      )
    );
  }, [data]);

  const theCourse = useCallback((id) => courses.find(e => e?.id === id)?.name, [courses]);

  return (
    <>
      <motion.div
        initial={{y: 100, opacity: 0}}
        animate={{y: 0, opacity: 1, transition: {delay: 0.4}}}
      >

        <Button
          variant="contained"
          color="primary"
          className="mx-6 my-12"
          onClick={() => setOpen(true)}
        >
          <AddIcon/>
          افزودن درخواست
        </Button>
        <Paper
          elevation={0}
          className="flex items-center justify-center flex-wrap w-full h-full p-16 mb-16"
        >
          {requests?.length ? requests?.map((e, i) => (
            <Card className={"max-w-320 m-16"}>
              <CardMedia
                sx={{height: 190}}
                image={`https://avatars.dicebear.com/api/${avatars[i]}/blue.svg`}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {e?.student}
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                  {theCourse(e?.course)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {e?.description}
                </Typography>
              </CardContent>
              <CardActions className={"flex justify-between"}>
                <Button color={"secondary"} size="small">{e?.telegram_id}@</Button>
                <Button color={"secondary"} size="small">{e?.email}</Button>
                <IconButton className={userId !== e?.student ? "hidden" : "block"}>
                  <DeleteIcon
                    color={"error"}
                    className={"cursor-pointer m-8"}
                    onClick={() => dispatch(DestroyRequest(e?.id))}/>
                </IconButton>
              </CardActions>
            </Card>
            // <Card className="w-320 p-16 flex flex-col rounded-none m-16" key={e.id}>
            //   <div>دانشجو: {e?.student}</div>
            //   {/*<div>موضوع: {e?.topic}</div>*/}
            //   <div>درس: {theCourse(e?.course)}</div>
            //   <div>آیدی تلگرام: {e?.telegram_id}</div>
            //   <div>ایمیل: {e?.email}</div>
            //   <div>توضیحات: {e?.description}</div>
            // </Card>
          )) : <p>درخواستی موجود نیست.</p>}
        </Paper>
      </motion.div>

      <WrapperD
        open={open}
        handleClose={() => setOpen(false)}
        title={"افزودن درخواست"}
        handleSubmit={() => ref?.current?.handleSubmit()}
      >
        {Form}
      </WrapperD>
    </>
  );
}

export const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const WrapperD = ({open, title, handleClose, children, handleSubmit}) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    maxWidth={"md"}
    fullWidth
    onClose={() => {
    }}
    aria-describedby="alert-dialog-slide-description">
    <AppBar className="mb-16" position="static" elevation={0}>
      <Toolbar className="flex w-full justify-between">
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
        <IconButton><CloseIcon className={"cursor-pointer"} onClick={handleClose}/></IconButton>
      </Toolbar>
    </AppBar>
    <DialogContent>{children}</DialogContent>
    <DialogActions className="mb-8 justify-center mr-16">
      <Button
        variant="contained"
        className="px-40 w-98"
        color="secondary"
        onClick={handleSubmit}
      >
        تایید
      </Button>
      <Button
        className="px-40 w-98"
        variant="contained"
        autoFocus
        onClick={handleClose}
      >
        انصراف
      </Button>
    </DialogActions>
  </Dialog>
);

export default App;
