const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        redirect: { name: 'camera' },
      },
      {
        path: 'camera',
        name: 'camera',
        component: () => import('pages/Index.vue'),
      },
      {
        path: '/add-person',
        name: 'add-person',
        component: () => import('pages/AddPerson.vue'),
      },
      {
        path: '/all-person',
        name: 'all-person',
        component: () => import('pages/AllPerson.vue'),
      },
    ],
  },
];
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
