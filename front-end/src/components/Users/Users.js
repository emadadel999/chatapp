import { List, ListElement, UsersContainer } from "./Users-styles";

const Users = ({ users, onUserClicked }) => {
  return (
    <UsersContainer>
      {users ? (
        <>
          {/* <StatusHead>Online ({userStateData.numOnline})</StatusHead> */}
          <List>
            {users.map((user) => {
              if (user.isOnline) {
                return (
                  <ListElement
                    key={user._id}
                    onClick={() => onUserClicked(user._id, user.username)}
                  >
                    {user.username} (online)
                  </ListElement>
                );
              } else {
                return (
                  <ListElement
                    key={user._id}
                    onClick={() => onUserClicked(user._id, user.username)}
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

export default Users;
