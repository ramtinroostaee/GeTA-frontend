import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
// import authRoles from "../auth/authRoles";

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [{
  id: 'applications', title: 'Applications', translate: 'APPLICATIONS', type: 'group', icon: 'apps', children: [{
    id: 'example-component', title: 'Example', translate: 'EXAMPLE', type: 'item', icon: 'whatshot', url: 'example',
  }, {
    id: 'profile', title: 'Profile', translate: 'Profile', type: 'item', // auth: authRoles.user,
    icon: 'whatshot', url: 'pages/profile',
  },],
},];

export default navigationConfig;
