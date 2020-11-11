
const Message = require("../models/messagesCollection");
const HttpError = require("../models/httpError");

const emittedClientMsg = (msg, socket) => {
    console.log(msg);
    socket.broadcast.emit('onServerMsg', msg);
};



exports.emittedClientMsg = emittedClientMsg;
