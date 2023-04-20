import axios from 'axios';

/*create an instance of axios with a default base URI when sending HTTP
requests*/

/*JSON Server has CORS Policy by default*/

const api = axios.create({
  baseURL: 'https://katesdemo-api.onrender.com/api/v1/',
});

export default api;

export const EndPoints = {
  shifts: 'shift',
  sessions: 'session',
  login: 'login',
  users: 'user',
};
