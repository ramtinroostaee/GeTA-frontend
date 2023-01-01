import React from "react";
import Typography from "@mui/material/Typography";
import {motion} from "framer-motion";
import {LocalOffer} from "@mui/icons-material";

const RequestsHead = () => (
  <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
    <div className="flex items-center">
      <LocalOffer fontSize={"large"}/>
      <Typography
        component={motion.span}
        initial={{x: -20}}
        animate={{x: 0, transition: {delay: 0.2}}}
        delay={300}
        className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
      >
        پیشنهاد ها
      </Typography>
    </div>
  </div>
);

export default RequestsHead;
