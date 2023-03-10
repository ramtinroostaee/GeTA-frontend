import Requests from "./App"
import {Navigate} from "react-router-dom";

const RequestsConfig = {
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
      path: "requests",
      exact: true,
      element: <Requests/>,
    },
    {
      path: "requests",
      element: () => <Navigate to="/requests"/>,
    },
  ],
};

export default RequestsConfig;
