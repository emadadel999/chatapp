const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const {
  allRoomsForUser,
  createRoom,
  updateRoom,
  addNewRoomMsg,
} = require("../controllers/roomController");
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

router.route("/rooms").post(createRoom);

router.route("/rooms/:roomId").put(updateRoom);

router.route("/rooms/:roomId/newmsg").post(addNewRoomMsg);

router.route("/rooms/:userId").get(allRoomsForUser);

module.exports = router;
