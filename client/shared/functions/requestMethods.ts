import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const TOKEN =
  // eslint-disable-next-line no-nested-ternary
  typeof window !== 'undefined'
    ? localStorage.getItem('persist:root') &&
      JSON.parse(
        JSON.parse(localStorage.getItem('persist:root') as string).user
      ).currentUser
      ? JSON.parse(
          JSON.parse(localStorage.getItem('persist:root') as string).user
        ).currentUser.accessToken
      : ''
    : '';

export const publicRequest = axios.create({
  baseURL: API_URL
});

export const userRequest = axios.create({
  baseURL: API_URL,
  headers: { token: `Bearer ${TOKEN}` }
});
