const { model } = require("mongoose");
const HttpError = require("../helpers/httpError");
const Room = model("Room");
const User = model("User");

module.exports.allRoomsForUser = (req, res, next) => {
  const currUserId = req.params.userId;
  Room.find({ users: { _id: currUserId } }, (err, rooms) => {
    if (err) return next(new HttpError(`server error, ${err}`, 500));
    return res.status(200).json(rooms);
  });
};

module.exports.createRoom = (req, res, next) => {
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
  const { msg } = req.body;
  Room.findById(roomId)
    .then((room) => {
      if (room) {
        room.messages.push(msg);
        return room.save();
      }
    })
    .then((result) => {
      return res.status(204).json(result);
    })
    .catch((err) => {
      next(new HttpError(`server error, ${err}`, 500));
    });
};
