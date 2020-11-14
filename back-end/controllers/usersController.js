const User = require("../models/usersCollection");
const HttpError = require("../models/httpError");

const allUsers = (req, res, next) => {
  const currUserId = req.query.id;
  User.find({ _id: { $nin: [currUserId] } }, { password:0 }, (err, users) => {
    if (err) return next(new HttpError(`server error, ${err}`, 500));
    if (!users) return next(new HttpError("no users found.", 422));
    return res.status(200).json(users);
  });
};

const setState = (req, res, next) => {
  const {userId, isOnline} = req.body;
  console.log(req.body);
  User.findOneAndUpdate({_id: userId}, {isOnline},{new: true}, (err, user) => {
    if (err) return next(new HttpError(`server error, ${err}`, 500));
    return res.status(200).json(user);
  })
}
exports.allUsers = allUsers;
exports.setState = setState;
