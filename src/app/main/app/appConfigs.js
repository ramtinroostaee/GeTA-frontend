import CoursesConfig from "./courses/CoursesConfig";

const appsConfigs = [CoursesConfig];

const authApps = appsConfigs.map((e) => ({
  ...e, routes: e.routes.map((route) => ({
    ...route
    // , auth: authRoles.user
  })),
}));

export default authApps;
