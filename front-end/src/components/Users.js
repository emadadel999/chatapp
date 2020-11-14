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
  const { numOfOnlineUsers, isOnline, userId } = useSelector(
    (state) => state.wsReducer
  );
  const [users, setUsers] = useState(null);
  const isUsers = !!users;
  useEffect(() => {
    if (isUsers) {
      setUsers((prevUsers) => {
        const userToUpdate = prevUsers
          ? prevUsers.find((u) => u._id === userId)
          : null;
        if (userToUpdate) {
          userToUpdate.isOnline = isOnline;
          return [...prevUsers];
        }
      });
    } else {
      getAllUsers(`${BACKEND_SERVER}/api/users?id=${currentUser._id}`);
    }
  }, [currentUser, userId, isOnline, isUsers]);

  // Helper Functions
  //// get all users from db
  const getAllUsers = async (url) => {
    try {
      const result = await Axios.get(url);
      console.log(result.data);
      setUsers(result.data);
    } catch (err) {
      const error = err.response ? err.response.data.message : err.message;
      console.error(error);
    }
  };

  return (
    <UsersContainer>
      <h1>{currentUser.username}</h1>
      <p>online({numOfOnlineUsers})</p>
      {users ? (
        <List>
          {users.map((user) => {
            if (user.isOnline) {
              return (
                <ListElement key={user._id}>
                  {user.username} (online)
                </ListElement>
              );
            }
            return <ListElement key={user._id}>{user.username}</ListElement>;
          })}
        </List>
      ) : (
        <p>Loading...</p>
      )}
    </UsersContainer>
  );
};

export default Users;
