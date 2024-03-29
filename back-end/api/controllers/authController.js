const { validationResult } = require("express-validator");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

const HttpError = require("../helpers/httpError");
const User = model("User");

module.exports.login = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("wrong input", 422));
  }
  const { username, password } = req.body;

  User.findOne({ username, password }, (err, userExist) => {
    if (err) return next(new HttpError("server error", 500));
    if (!userExist)
      return next(
        new HttpError("wrong credintials, check username or password", 422)
      );
    const currentUser = {
      _id: userExist._id,
      username: userExist.username,
    };
    const token = jwt.sign(currentUser, process.env.PASS_PHRASE);
    return res.status(200).json({
      token,
    });
  });
};

module.exports.register = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("wrong input", 422));
  }
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (error) {
    return next(new HttpError("server error", 500));
  }

  if (existingUser)
    return next(new HttpError("wrong credintials, user already exists", 422));

  const newUser = new User({ username, email, password });

  newUser.save((err, createdUser) => {
    if (err) return next(new HttpError("server error", 500));
    const currentUser = {
      _id: createdUser._id,
      username: createdUser.username,
    };
    const token = jwt.sign(currentUser, process.env.PASS_PHRASE);
    return res.status(201).json({
      token,
    });
  });
};
