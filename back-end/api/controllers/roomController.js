const { model } = require("mongoose");
const { HttpError } = require("../data/models");
const Room = model("Room");

module.exports.allRoomsForUser = (req, res, next) => {
  const currUserId = req.params.userId;
  Room.find({ users: { $elemMatch: { _id: currUserId } } }, (err, rooms) => {
    if (err) return next(new HttpError(`server error, ${err}`, 500));
    if (!rooms) return next(new HttpError("no rooms found.", 422));
    return res.status(200).json(rooms);
  });
};

module.exports.createRoom = (req, res, next) => {
  const newRoom = {
    ...req.body,
  };
  Room.create(newRoom, (err, createdRoom) => {
    if (err) return next(new HttpError(`server error, ${err}`, 500));
    return res.status(201).json(createdRoom);
  });
};
