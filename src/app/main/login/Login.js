import Card from '@mui/material/Card';
import {styled, darken} from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import CSRFLoginTab from "./tabs/CSRFLoginTab";

const Root = styled('div')(({theme}) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
  color: theme.palette.primary.contrastText,

  '& .Login-leftSection': {},

  '& .Login-rightSection': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function Login() {
  return (<Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
    <motion.div
      initial={{opacity: 0, scale: 0.6}}
      animate={{opacity: 1, scale: 1}}
      className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
    >
      <Card
        className="Login-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
        square
      >
        <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">

          <CSRFLoginTab/>
        </CardContent>

        <div className="flex flex-col items-center justify-center pb-32">
          <div>
            <span className="font-normal mr-8">حساب کاربری ندارید؟</span>{" "}
            <Link className="font-normal" to="/register">
              ثبت نام
            </Link>
          </div>
          <Link className="font-normal mt-8" to="/">
            Back to Dashboard
          </Link>
        </div>
      </Card>

      <div className="Login-rightSection hidden md:flex flex-1 items-center justify-center p-64">
        <div className="max-w-512">
          <motion.div
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0, transition: {delay: 0.2}}}
          >
            <Typography variant="h3" color="inherit" className="font-semibold leading-tight">
              به GeTA خوش آمدید!
            </Typography>
          </motion.div>

          {/*<motion.div*/}
          {/*  initial={{opacity: 0}}*/}
          {/*  animate={{opacity: 1, transition: {delay: 0.3}}}*/}
          {/*>*/}
          {/*  <Typography variant="subtitle1" color="inherit" className="mt-32">*/}
          {/*    Powerful and professional admin template for Web Applications, CRM, CMS, Admin*/}
          {/*    Panels and more.*/}
          {/*  </Typography>*/}
          {/*</motion.div>*/}
        </div>
      </div>
    </motion.div>
  </Root>);
}

export default Login;
