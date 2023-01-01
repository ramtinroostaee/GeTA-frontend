import Courses from "./App"
import {Navigate} from "react-router-dom";

const CoursesConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "courses",
      exact: true,
      element: <Courses/>,
    },
    {
      path: "courses",
      element: () => <Navigate to="/courses"/>,
    },
  ],
};

export default CoursesConfig;
