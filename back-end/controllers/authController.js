const { validationResult } = require("express-validator");

const User = require("../models/usersCollection");
const HttpError = require("../models/httpError");

const login = (req, res, next) => {
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
      isOnline: userExist.isOnline
    }
    return res.status(200).json({
      message: "successfully logged in",
      isAuth: true,
      currentUser,
    });
  });
};

const register = async (req, res, next) => {
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
      isOnline: userExist.isOnline
    }
    return res.status(201).json({
      message: "successfully registered",
      isAuth: true,
      currentUser,
    });
  });
};

exports.login = login;
exports.register = register;
