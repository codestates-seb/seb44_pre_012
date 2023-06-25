import axios from 'axios';
import { store } from '../redux/store';
import { BASE_URL } from '../constants/apiUrl';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  config => {
    const { accessToken } = store.getState().auth.login;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
