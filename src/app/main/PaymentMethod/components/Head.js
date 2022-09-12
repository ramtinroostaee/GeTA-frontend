import React from "react";
import Hidden from "@mui/material/Hidden";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {motion} from "framer-motion";

const PaymentOrderHead = (props) => {
  return (
    <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
      <div className="flex flex-shrink items-center">
        <Hidden lgUp>
          <IconButton
            onClick={(ev) => {
              props.pageLayout.current.toggleLeftSidebar();
            }}
            aria-label="open left sidebar"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>

        <div className="flex items-center">
          <i className="fa-solid fa-book fa-2x"/>
          <Typography
            component={motion.span}
            initial={{x: -20}}
            animate={{x: 0, transition: {delay: 0.2}}}
            delay={300}
            className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
          >
            تعیین شیوه پرداخت
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PaymentOrderHead;
