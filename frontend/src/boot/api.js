import api from '@api';

export default async ({ Vue }) => {
  Vue.prototype.$api = { ...api };
};
