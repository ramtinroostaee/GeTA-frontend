import React from "react";
import Typography from "@mui/material/Typography";
import {motion} from "framer-motion";
import BookIcon from '@mui/icons-material/Book';

const RequestsHead = () => (
  <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
    <div className="flex items-center">
      <BookIcon fontsize={"large"}/>
      <Typography
        component={motion.span}
        initial={{x: -20}}
        animate={{x: 0, transition: {delay: 0.2}}}
        delay={300}
        className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
      >
        دروس
      </Typography>
    </div>
  </div>
);

export default RequestsHead;
