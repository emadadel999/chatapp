import React from "react";
import styled from "styled-components";

const UsersContainer = styled.div`
  height: 100vh;
  width: 20vw;
  border: 2px solid black;
`;

const List = styled.ul`

`;

const ListElement = styled.li`
  
`;

const Users = ({onlineUsernames, numOnlineUsers}) => {
  
  return (
    <UsersContainer>
      <p>online({numOnlineUsers})</p>
      <List>
        {onlineUsernames.map((name) => (
          <ListElement key={name}>{name}</ListElement>
        ))}
      </List>
    </UsersContainer>
  );
};

export default Users;
