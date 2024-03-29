import React from "react";
import ReactDOM from "react-dom";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'font-awesome/css/font-awesome.css';

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// const loggerMiddleware = createLogger();

// const persistentState = loadUserData();

// const store = createStore(
//   rootReducer,
//   persistentState,
//   applyMiddleware(thunkMiddleware, loggerMiddleware)
// );

// store.subscribe(() => {
//   saveUserData({
//     userReducer: store.getState().userReducer,
//   });
// });

ReactDOM.render(
  // <Provider store={store}>
  <App />,
  // </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
