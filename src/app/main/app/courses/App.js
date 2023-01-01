import {useRef} from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import CoursesContent from "./components/Content";
import CoursesHead from "./components/Head";

const CoursesApp = () => {
  const pageLayout = useRef();

  return (
    <FusePageSimple
      classes={{
        contentWrapper: "p-16 h-full",
        content: "flex flex-col h-full",
        leftSidebar: "w-256 border-0",
        header: "sm:h-80 sm:min-h-80",
        wrapper: "min-h-0",
      }}
      header={<CoursesHead pageLayout={pageLayout}/>}
      content={<CoursesContent/>}
      sidebarInner
      ref={pageLayout}
      innerScroll
    />
  );
};

export default CoursesApp;
