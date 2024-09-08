import axios from "axios";
import { BACKEND_SERVER } from "../globals";

export async function login(username: string, password: string) {
  return axios.post(`${BACKEND_SERVER}/api/login`, {
    username: username,
    password: password,
  })
    .then((res) => res.data)
    .catch((err) => {
      const error = err.response ? err.response.data.message : err.message;
      console.log('error trying to login: ', error);
      return error;
    });
};
export function register(username: string, email: string, password: string) {
  return axios.post(`${BACKEND_SERVER}/api/register`, {
    username: username,
    email: email,
    password: password,
  })
    .then((res) => res.data)
    .catch((err) => {
      const error = err.response ? err.response.data.message : err.message;
      console.log('error trying to register', error);
      return error;
    });
};
