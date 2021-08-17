const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");

module.exports.login = function (username, password) {
  return axios
    .post(`${BACKEND_SERVER}/api/login`, {
      username: username,
      password: password,
    })
    .then((res) => res.data)
    .catch((err) => {
      const error = err.response ? err.response.data.message : err.message;
      console.log(error);
      return error;
    });
};

module.exports.register = function (username, email, password) {
  return axios
    .post(`${BACKEND_SERVER}/api/register`, {
      username: username,
      email: email,
      password: password,
    })
    .then((res) => res.data)
    .catch((err) => {
      const error = err.response ? err.response.data.message : err.message;
      console.log(error);
      return error;
    });
};
