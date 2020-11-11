import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Axios from "axios";
import { BACKEND_SERVER } from "../shared/globals";

const UsersContainer = styled.div`
  height: 100vh;
  width: 20vw;
  border: 2px solid black;
`;

const List = styled.ul``;

const ListElement = styled.li``;

const Users = ({ currentUser }) => {
  const { user, updatedNumOfUsers } = useSelector((state) => state.wsReducer);
  const [users, setUsers] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    setOnlineUsers(previousUsers => {
      if (user) {
        if(users.find((u) => u._id === user))
          return previousUsers.filter(u => u._id !== user);
        return [...previousUsers, user];
      }
      return previousUsers;
    });
    getAllUsers(`${BACKEND_SERVER}/api/users?id=${currentUser._id}`);
  }, [user, currentUser]);

  // Helper Functions
  //// get all users from db
  const getAllUsers = async (url) => {
    try {
      const result = await Axios.get(url);
      setUsers(result.data);
    } catch (err) {
      const error = err.response ? err.response.data.message : err.message;
      console.error(error);
    }
  };
  
  return (
    <UsersContainer>
      <p>online({updatedNumOfUsers})</p>
      {users ? (
        <List>
          {users.map((user) => (
            <ListElement key={user._id}>{user.username}</ListElement>
          ))}
        </List>
      ) : (
        <p>Loading...</p>
      )}
    </UsersContainer>
  );
};

export default Users;
