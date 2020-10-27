
const Message = require("../models/messagesCollection");
const HttpError = require("../models/httpError");

const emittedClientMsg = (msg, socket) => {
    console.log(msg);
    socket.broadcast.emit('onServerMsg', {
        username: socket.username,
        message: msg
    });
};

const addUser = (socket, username, numUsers) => {
    console.log(username);
    socket.username = username;
    socket.broadcast.emit('userEntered', {
        username,
        numUsers
    })
}



exports.emittedClientMsg = emittedClientMsg;
exports.addUser = addUser;
