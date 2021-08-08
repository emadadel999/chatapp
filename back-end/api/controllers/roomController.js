const { model } = require("mongoose");
const HttpError = require("../helpers/httpError");
const Room = model("Room");
const User = model("User");

module.exports.allRoomsForUser = (req, res, next) => {
  const currUserId = req.params.userId;
  Room.find({ users: { _id: currUserId } }, (err, rooms) => {
    if (err) return next(new HttpError(`server error, ${err}`, 500));
    if (!rooms || rooms.length === 0)
      return next(new HttpError("no rooms found.", 422));
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

  Room.findOne({ users: { _id: chattedUserId } })
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

// function _updateUsersRooms(createdRoom) {
//   return Promise.all(
//     createdRoom.users.map((userId) => {
//       return User.findByIdAndUpdate(
//         userId,
//         { $push: { rooms: createdRoom._id } },
//         { new: true }
//       );
//     })
//   );
// }
