import {Navigate} from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import RegisterConfig from "../main/register/RegisterConfig";
import LogoutConfig from "../main/logout/LogoutConfig";
import LoginConfig from "../main/login/LoginConfig";
import ProfilePageConfig from "../main/pages/profile/ProfilePageConfig";
import appsConfig from "../main/app/appConfigs";

const routeConfigs = [RegisterConfig, LogoutConfig, LoginConfig, ProfilePageConfig, ...appsConfig];

const routes = [// if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null), {
    path: '/', element: <Navigate to="example"/>,
  }, {
    path: 'loading', element: <FuseLoading/>,
  }, {
    path: '404', element: <Error404Page/>,
  }, {
    path: '*', element: <Navigate to="404"/>,
  },];

export default routes;
