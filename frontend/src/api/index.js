import axios from 'axios';
import { Notify } from 'quasar';


const api = axios.create({
  baseURL: 'http://192.168.88.109/',
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.toString() !== 'Cancel') {
    Notify.create({
      message: (error.response.data && error.response.data.message)
        || `${error.response.status}: ${error.response.statusText}`,
      color: 'negative',
      position: 'bottom-right',
    });
  }
  return Promise.reject(error.response);
});

export const { CancelToken } = axios;
export const get = (entity, params = null) => api.get(entity, params);
export const post = (entity, data, option = null) => api.post(entity, data, option);
export const put = (entity, id, data) => api.put(`${entity}/${id}`, data);
export const remove = (entity, id) => api.delete(`${entity}/${id}`);

export default {
  get,
  post,
  put,
  remove,
  CancelToken,
};
