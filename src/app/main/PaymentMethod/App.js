import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useDeepCompareEffect } from "@fuse/hooks";
import withReducer from "app/store/withReducer";
import { clearStore, GetBills, GetRoutes } from "./store/slice";
import PaymentMethodContent from "./components/Content";
import PaymentMethodHead from "./components/Head";
import reducer from "./store";

const PaymentMethodApp = () => {
  const dispatch = useDispatch();
  const pageLayout = useRef();

  useDeepCompareEffect(() => {
    dispatch(clearStore());
    dispatch(GetBills());
  }, [dispatch]);

  return (
    <React.Fragment>
      <FusePageSimple
        classes={{
          contentWrapper: "p-16 h-full",
          content: "flex flex-col h-full",
          header: "sm:h-80 sm:min-h-80",
          wrapper: "min-h-0",
        }}
        header={<PaymentMethodHead pageLayout={pageLayout} />}
        content={<PaymentMethodContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </React.Fragment>
  );
};

export default withReducer("PaymentMethod", reducer)(PaymentMethodApp);
