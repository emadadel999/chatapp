import { User } from "../../types/types";

interface UsersProps {
  currentUser: User,
  users?: User[],
  onUserClicked: (chattedUserId: string, chattedUsername: string) => void
}

const Users = ({ users, onUserClicked }: UsersProps) => {
  return (
    <>
      {users ? (
        <>
          {/* <p className="status-head">Online ({userStateData.numOnline})</p> */}
          <ul className="list-users__list">
            {users.map((user) => {
              if (user.isOnline) {
                return (
                  <li className="list-user">
                    <button
                      key={user.id}
                      className="list-user__btn"
                      onClick={() => onUserClicked(user.id, user.username)}
                    >
                      {user.username} (online)
                    </button>
                  </li>
                );
              } else {
                return (
                  <li className="list-user">
                    <button
                      key={user.id}
                      className="list-user__btn"
                      onClick={() => onUserClicked(user.id, user.username)}
                    >
                      {user.username}
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </>
      ) : (
        <p className="list-users__loading">Loading...</p>
      )}
    </>
  );
};

export default Users;
