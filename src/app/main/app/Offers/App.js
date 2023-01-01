import {useRef} from "react";
import {useDispatch} from "react-redux";
import FusePageSimple from "@fuse/core/FusePageSimple";
import OffersContent from "./components/Content";
import OffersHead from "./components/Head";
import withReducer from "../../../store/withReducer";
import reducer from "./store";
import {useDeepCompareEffect} from "../../../../@fuse/hooks";
import {clearStore, GetCourses, GetOffers} from "./store/slice";

const OffersApp = () => {
  const pageLayout = useRef();
  const dispatch = useDispatch();

  useDeepCompareEffect(() => {
    dispatch(clearStore());
    dispatch(GetOffers());
    dispatch(GetCourses());
  }, [dispatch]);

  return (
    <FusePageSimple
      classes={{
        contentWrapper: "p-16 h-full",
        content: "flex flex-col h-full",
        leftSidebar: "w-256 border-0",
        header: "sm:h-80 sm:min-h-80",
        wrapper: "min-h-0",
      }}
      header={<OffersHead pageLayout={pageLayout}/>}
      content={<OffersContent/>}
      sidebarInner
      ref={pageLayout}
      innerScroll
    />
  );
};

export default withReducer("Offers", reducer)(OffersApp);
