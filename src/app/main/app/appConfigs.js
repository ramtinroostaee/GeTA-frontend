import CoursesConfig from "./courses/CoursesConfig";
import RequestsConfig from "./Requests/RequestsConfig";
import OffersConfig from "./Offers/OffersConfig";
import authRoles from "../../auth/authRoles";

const appsConfigs = [CoursesConfig, RequestsConfig, OffersConfig];

const authApps = appsConfigs.map((e) => ({
  ...e, routes: e.routes.map((route) => ({
    ...route
    , auth: authRoles.user
  })),
}));

export default authApps;
