import CoursesConfig from "./courses/CoursesConfig";
import RequestsConfig from "./Requests/RequestsConfig";

const appsConfigs = [CoursesConfig, RequestsConfig];

const authApps = appsConfigs.map((e) => ({
  ...e, routes: e.routes.map((route) => ({
    ...route
    // , auth: authRoles.user
  })),
}));

export default authApps;
