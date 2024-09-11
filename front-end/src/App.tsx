import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Home from "./pages/Home/Home";
import { loadUserData, removeUserData } from "./shared/localStorage";
import { Socket } from "socket.io-client";
import { Room, User } from "./types/types";
import { initialMyRoom, MyRoomContext, MyRoomDispatchContext, myRoomReducer } from "./shared/reducers/MyRoomContext";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const [myRoom, dispatch] = useReducer(myRoomReducer, undefined);
  useEffect(() => {
    const userData = loadUserData();
    if (userData) {
      setLoggedIn(true);
      setCurrentUser(userData);
    } else {
      setLoggedIn(false);
      setCurrentUser(undefined);
    }
  }, []);

  const onSignOut = (socket: Socket) => {
    removeUserData();
    setLoggedIn(false);
    setCurrentUser(undefined);
    if (dispatch) {
      dispatch({
        type: 'setRoom',
        room: undefined
      })      
    }
    socket.disconnect();
  };

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' condition={isLoggedIn} redirectRoute='/auth'>
          <MyRoomContext.Provider value={myRoom}>
          <MyRoomDispatchContext.Provider value={dispatch}>
            <Home signout={onSignOut} currentUser={currentUser || {} as User} />
          </MyRoomDispatchContext.Provider>
          </MyRoomContext.Provider>
        </PrivateRoute>
        <PrivateRoute exact path='/auth' condition={!isLoggedIn} redirectRoute='/'>
          <Authenticate setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ children, condition, redirectRoute, ...props } : any) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        condition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectRoute,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
