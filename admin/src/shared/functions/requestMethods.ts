import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN =
  localStorage.getItem('persist:root') &&
  JSON.parse(JSON.parse(localStorage.getItem('persist:root') as string).user)
    .currentUser
    ? JSON.parse(
        JSON.parse(localStorage.getItem('persist:root') as string).user
      ).currentUser.accessToken
    : '';

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }
});
