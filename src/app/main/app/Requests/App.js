import {useRef} from "react";
import {useDispatch} from "react-redux";
import FusePageSimple from "@fuse/core/FusePageSimple";
import RequestsContent from "./components/Content";
import RequestsHead from "./components/Head";
import withReducer from "../../../store/withReducer";
import reducer from "./store";
import {useDeepCompareEffect} from "../../../../@fuse/hooks";
import {clearStore, GetCourses, GetRequests} from "./store/slice";

const RequestsApp = () => {
  const pageLayout = useRef();
  const dispatch = useDispatch();

  useDeepCompareEffect(() => {
    dispatch(clearStore());
    dispatch(GetRequests());
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
      header={<RequestsHead pageLayout={pageLayout}/>}
      content={<RequestsContent/>}
      sidebarInner
      ref={pageLayout}
      innerScroll
    />
  );
};

export default withReducer("Requests", reducer)(RequestsApp);
