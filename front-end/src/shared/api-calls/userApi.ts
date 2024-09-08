import axios from "axios";
import { BACKEND_SERVER } from "../globals";
import { User } from "../../types/types";


export function usersGetAll(currUserId: string, setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>) {
  return axios.get(`${BACKEND_SERVER}/api/users?id=${currUserId}`)
    .then(function (res) {
      setUsers(res.data);
    })
    .catch(function (err) {
      const error = err.response ? err.response.data.message : err.message;
      console.error('error getting allusers: ', error);
    });
};
