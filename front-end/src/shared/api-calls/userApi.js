const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");

module.exports.usersGetAll = function (currUserId, setUsers) {
  return axios
    .get(`${BACKEND_SERVER}/api/users?id=${currUserId}`)
    .then(function (res) {
      setUsers(res.data);
    })
    .catch(function (err) {
      const error = err.response ? err.response.data.message : err.message;
      console.error(error);
    });
};
