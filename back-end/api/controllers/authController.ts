import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

import HttpError from "../helpers/httpError";

import { prisma } from '../data/db';

module.exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log("login() validation error", error);
    return next(new HttpError("wrong input", 422));
  }
  const { username, password } = req.body;
  console.log("login() body username, password: ", username, password);
  try {
    const exitingUser = await prisma.user.findFirst({
      where: {
        username,
        password
      }
    });
    if (!exitingUser) {
      console.log("login() no existingUser found");
      return next(
        new HttpError("wrong credintials, check username or password", 422)
      );
    }
    console.log("login() got user: ", exitingUser);
    const currentUser = {
      id: exitingUser.id,
      username: exitingUser.username,
    };
    const secret = process?.env?.PASS_PHRASE as string;
    const token = jwt.sign(currentUser, secret, {
      algorithm: 'HS256',
      subject: 'chatapp:subject',
      issuer: 'chatapp:issuer',
      audience: `chatapp:audience`,
      expiresIn: "2h",
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.log("login() error fetching user", error);
    return next(new HttpError("server error", 500));
  }
};

module.exports.register = async (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log("register() validation error", error);
    return next(new HttpError("wrong input", 422));
  }
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await prisma.user.findFirst({ where: { username } });
  } catch (error) {
    console.log("register() error finding existingUser: ", error);
    return next(new HttpError("server error", 500));
  }

  if (existingUser) {
    console.log("register() existingUser found", existingUser);
    return next(new HttpError("wrong credintials, user already exists", 422));
  }

  try {
    const newUser = await prisma.user.create({
      data: { username, email, password }
    });
    const currentUser = {
      id: newUser.id,
      username: newUser.username,
    };
    const secret = process?.env?.PASS_PHRASE as string;
    const token = jwt.sign(currentUser, secret, {
      algorithm: 'HS256',
      subject: 'chatapp:subject',
      issuer: 'chatapp:issuer',
      audience: `chatapp:audience`,
      expiresIn: "2h",
    });
    return res.status(201).json({ token });

  } catch (error) {
    console.log("register() error creating newUser", error);
    return next(new HttpError("server error", 500));
  }
};
