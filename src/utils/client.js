import axios from 'axios';
import { isTokenExpired } from './isTokenExpired';
export const client = axios.create({
  baseURL: 'https://studapi.teachmeskills.by',
  timeout: 1000
});

export const setAccessTokenCLient = (token) => {
  if (!token || isTokenExpired(token)) return;
  client.defaults.headers.common.Authorization = 'Bearer ' + token;
};
