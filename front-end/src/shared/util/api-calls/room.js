const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../../globals");

module.exports.createRoom = function (room) {
  return axios.post(`${BACKEND_SERVER}/api/rooms`, room);
  // .then(function (res) {
  //   return res;
  // })
  // .catch(function (err) {
  //   return err;
  // });
};
