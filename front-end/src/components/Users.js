import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Axios from "axios";
import { BACKEND_SERVER } from "../shared/globals";

const Users = ({ currentUser, userChosenHandler }) => {
  const { numOfOnlineUsers, isOnline, userId } = useSelector(
    (state) => state.wsReducer
  );
  const [users, setUsers] = useState(null);
  const isUsers = !!users;

  useEffect(() => {
    if (!isUsers)
      getAllUsers(`${BACKEND_SERVER}/api/users?id=${currentUser._id}`).then(
        (allUsers) => {
          setUsers(allUsers);
        }
      );
    setUsers((prevUsers) => {
      const userToUpdate = prevUsers
        ? prevUsers.find((u) => u._id === userId)
        : null;
      if (userToUpdate) {
        userToUpdate.isOnline = isOnline;
        return [...prevUsers];
      }
      return prevUsers;
    });
  }, [currentUser, userId, isOnline, isUsers]);

  // Helper Functions
  //// get all users from db
  const getAllUsers = async (url) => {
    try {
      const result = await Axios.get(url);
      return result.data;
    } catch (err) {
      const error = err.response ? err.response.data.message : err.message;
      console.error(error);
    }
  };

  return (
    <UsersContainer>
      <StatusHead>Online ({numOfOnlineUsers})</StatusHead>
      {users ? (
        <List>
          {users.map((user) => {
            if (user.isOnline) {
              return (
                <ListElement
                  key={user._id}
                  onClick={() => userChosenHandler(user._id)}
                >
                  {user.username} (online)
                </ListElement>
              );
            }
            return (
              <ListElement
                key={user._id}
                onClick={() => userChosenHandler(user._id)}
              >
                {user.username}
              </ListElement>
            );
          })}
        </List>
      ) : (
        <p>Loading...</p>
      )}
    </UsersContainer>
  );
};

const UsersContainer = styled.div`
  height: 70%;
`;

const StatusHead = styled.p`
  text-align: center;
  font-size: 25px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListElement = styled.button`
  cursor: pointer;
  height: 50px;
  font-size: 20px;
`;

export default Users;
