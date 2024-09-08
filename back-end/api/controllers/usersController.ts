import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import HttpError from "../helpers/httpError";
import { prisma } from '../data/db';

module.exports.allUsers = async (req: Request, res: Response, next: NextFunction) => {
  const currUserId = req.query.id as string;
  let users: User[];
  try {
    if (currUserId) {
      users = await prisma.user.findMany({
        where: {
          NOT: {
            id: currUserId
          }
        }
      });
    } else {
      users = await prisma.user.findMany();
    }
    if (!users || users.length === 0) return res.status(404).json(users);

    return res.status(200).json(users);
  } catch (error) {
    console.log("allUsers() error: ", error);
    return next(new HttpError(`server error, ${error}`, 500));
  }
};

module.exports.setState = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, isOnline } = req.body as { userId: string, isOnline: boolean };
  try {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isOnline
      }
    })

    if(!user) res.status(404).json(user);

    return res.status(200).json(user);

  } catch (error) {
    console.log("setState() error: ", error);
    return next(new HttpError(`server error, ${error}`, 500));
  }
};
