import {lazy} from "react";
import {Navigate} from "react-router-dom";

const App = lazy(() => import("./App"));

const PaymentMethodConfig = {
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
      path: "/PaymentMethod",
      exact: true,
      element: <App/>,
    },
    {
      path: "/PaymentMethod",
      element: () => <Navigate to="/PaymentMethod"/>,
    },
  ],
};

export default PaymentMethodConfig;
