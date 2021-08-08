import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { BACKEND_SERVER } from "../shared/globals";

function _usersGetAll(currUserId, setUsers) {
  Axios.get(`${BACKEND_SERVER}/api/users?id=${currUserId}`)
    .then(function (res) {
      setUsers(res.data);
    })
    .catch(function (err) {
      const error = err.response ? err.response.data.message : err.message;
      console.error(error);
    });
}

const Users = ({ currentUser, userChosenHandler, userStateData }) => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    if (users) {
      setUsers((prevUsers) => {
        const userToUpdate = prevUsers.find(
          (u) => u._id === userStateData.userId
        );
        if (userToUpdate) {
          userToUpdate.isOnline = userStateData.isOnline;
          return [...prevUsers];
        }
        return prevUsers;
      });
    } else {
      _usersGetAll(currentUser._id, setUsers);
    }
  }, [currentUser, userStateData, users]);

  return (
    <UsersContainer>
      {users ? (
        <>
          <StatusHead>Online ({userStateData.numOnline})</StatusHead>
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
              } else {
                return (
                  <ListElement
                    key={user._id}
                    onClick={() => userChosenHandler(user._id)}
                  >
                    {user.username}
                  </ListElement>
                );
              }
            })}
          </List>
        </>
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
