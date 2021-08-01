const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const { allUsers, setState } = require("../controllers/usersController");

router
  .route("/login")
  .post(
    [
      check("username").notEmpty().isLength({ max: 15 }),
      check("password").notEmpty().isLength({ min: 6, max: 10 }),
    ],
    login
  );

router
  .route("/register")
  .post(
    [
      check("username").notEmpty().isLength({ max: 15 }),
      check("email").notEmpty().isEmail(),
      check("password").notEmpty().isLength({ min: 6, max: 10 }),
    ],
    register
  );

router.route("/users").get(allUsers);

router.route("/userstate").post(setState);

module.exports = router;
