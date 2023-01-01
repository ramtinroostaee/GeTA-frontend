import Offers from "./App"
import {Navigate} from "react-router-dom";

const OffersConfig = {
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
      path: "offers",
      exact: true,
      element: <Offers/>,
    },
    {
      path: "offers",
      element: () => <Navigate to="/offers"/>,
    },
  ],
};

export default OffersConfig;
