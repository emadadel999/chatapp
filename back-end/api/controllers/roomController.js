const { model } = require("mongoose");
const HttpError = require("../helpers/httpError");
const Room = model("Room");
const User = model("User");

module.exports.allRoomsForUser = (req, res, next) => {
  const currUserId = req.params.userId;
  Room.find({ users: { _id: currUserId } }, (err, rooms) => {
    if (err) return next(new HttpError(`server error, ${err}`, 500));
    // if (!rooms || rooms.length === 0)
    //   return next(new HttpError("no rooms found.", 422));
    console.log("found rooms", rooms);
    return res.status(200).json(rooms);
  });
};

module.exports.createRoom = (req, res, next) => {
  const chattedUserId = req.body.chattedUserId;
  const newRoom = {
    roomName: req.body.roomName,
    users: req.body.users,
    roomType: req.body.roomType,
  };

  Room.findOne({ users: { $all: newRoom.users }, roomType: newRoom.roomType })
    .then((room) => {
      if (!room) {
        return Room.create(newRoom);
      } else {
        res.status(201).json(room);
      }
    })
    .then((createdRoom) => {
      if (createdRoom) {
        console.log("created room", createdRoom);
        return res.status(201).json(createdRoom);
      }
    })
    .catch((err) => {
      next(new HttpError(`server error, ${err}`, 500));
    });
};

module.exports.updateRoom = (req, res, next) => {};

module.exports.addNewRoomMsg = (req, res, next) => {
  const { roomId } = req.params;
  console.log("req.body", req.body);
  const { msg } = req.body;
  console.log("msg from client", { msg, roomId });
  Room.findById(roomId)
    .then((room) => {
      console.log("got room", room);
      if (room) {
        room.messages.push(msg);
        return room.save();
      }
    })
    .then((result) => {
      console.log("result", result);
    })
    .catch((err) => {
      next(new HttpError(`server error, ${err}`, 500));
    });
};
