const navigationConfig = [
  {
    id: 'applications', title: 'داشبورد', type: 'group', icon: 'apps',
    children: [
      {
        id: 'Courses', title: 'دروس', type: 'item', // auth: authRoles.user,
        icon: 'book', url: 'courses',
      },
      {
        id: 'Requests', title: 'درخواست ها', type: 'item', // auth: authRoles.user,
        icon: 'whatshot', url: 'requests',
      },
      {
        id: 'Offers', title: 'پیشنهاد ها', type: 'item', // auth: authRoles.user,
        icon: 'local_offer', url: 'offers',
      },
    ],
  }
];

export default navigationConfig;
