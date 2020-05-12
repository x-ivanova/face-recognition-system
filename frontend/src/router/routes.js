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
