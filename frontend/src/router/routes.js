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
        path: '/remove-person',
        name: 'remove-person',
        component: () => import('pages/RemovePerson.vue'),
      },
      {
        path: '/find-person',
        name: 'find-person',
        component: () => import('pages/FindPerson.vue'),
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
