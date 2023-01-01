import {useCallback, useMemo, useState} from "react";
import Card from '@mui/material/Card';
import {motion} from 'framer-motion';
import {CardMedia, Grid, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import {createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import useForm from "reusable/hooks/useForm";
import {CreateOffers, DestroyOffer} from "../store/slice";
import {form} from "../array/form";
import {mapCreateElement} from "../../../../../reusable/Form/FormCreate";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import {WrapperD} from "../../Requests/components/Content";

const selectMaker = (data) =>
  createSelector(
    ({Offers}) => Offers.slice[data],
    (data) => data
  );

const avatars = ['big-ears-neutral', 'big-smile', 'croodles-neutral', 'initials', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art'];

const App = () => {
  const offers = useSelector(selectMaker("offers"));
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
    dispatch(CreateOffers(values)).then(() => setOpen(false));
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
          افزودن پیشنهاد
        </Button>
        <Paper
          elevation={0}
          className="flex items-center justify-center flex-wrap w-full h-full p-16 mb-16"
        >
          {offers?.length ? offers?.map((e, i) => (
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
                <IconButton className={userId !== e?.instructor ? "hidden" : "block"}>
                  <DeleteIcon
                    color={"error"}
                    className={"cursor-pointer m-8"}
                    onClick={() => dispatch(DestroyOffer(e?.id))}/>
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
        title={"افزودن پیشنهاد"}
        handleSubmit={() => ref?.current?.handleSubmit()}
      >
        {Form}
      </WrapperD>
    </>
  );
}

export default App;
