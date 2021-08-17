const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");

module.exports.getOrCreateRoom = function (room) {
  return axios.post(`${BACKEND_SERVER}/api/rooms`, room);
};

module.exports.roomsGetAll = function (currUserId, setRooms) {
  return axios
    .get(`${BACKEND_SERVER}/api/rooms/${currUserId}`)
    .then(function (res) {
      setRooms(res.data);
    })
    .catch(function (err) {
      const error = err.response ? err.response.data.message : err.message;
      console.error(error);
    });
};

module.exports.addMsgToRoom = function (msg, roomId) {
  console.log("msg to server", { msg, roomId });
  return axios
    .post(`${BACKEND_SERVER}/api/rooms/${roomId}/newmsg`, { msg })
    .then((success) => {
      console.log("success adding msg to room", success);
    })
    .catch((err) => console.log(err));
};
