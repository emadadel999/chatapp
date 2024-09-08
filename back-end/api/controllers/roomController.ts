import { Message, Prisma, Room } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from '../data/db';
import HttpError from "../helpers/httpError";


const roomWithUsers = Prisma.validator<Prisma.RoomDefaultArgs>()({
  include: { users: true },
})
type RoomWithUsers = Prisma.RoomGetPayload<typeof roomWithUsers>


module.exports.allRoomsForUser = async (req: Request, res: Response, next: NextFunction) => {
  const currUserId = req.params.userId;
  try {
    const rooms = await prisma.room.findMany({
      where: {
        users: {
          some: {
            id: currUserId
          }
        }
      }
    });
    return res.status(200).json(rooms);

  } catch (error) {
    console.log("allRoomsForUser() error finding user rooms: ", error);
    return next(new HttpError(`server error, ${error}`, 500));
  }
};

module.exports.createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const newRoom = {
    roomName: req.body.roomName,
    userIDs: req.body.userIDs,
    roomType: req.body.roomType,
  } as Room;
  try {
    const existingRoom = await prisma.room.findFirst({
      where: {
        userIDs: {
          hasEvery: newRoom.userIDs
        },
        roomType: newRoom.roomType
      },
      include: {
        messages: true
      }
    });
    if (existingRoom) {
      return res.status(201).json(existingRoom)
    } else {
      if (newRoom.userIDs?.length > 0) {
        const authorId = newRoom.userIDs[0];
        const createdRoom = await prisma.room.create({
          data: {
            authorId,
            roomName: newRoom.roomName,
            roomType: newRoom.roomType,
            userIDs: newRoom.userIDs,
          },
          include: {
            messages: true
          }
        });
        if (createdRoom) return res.status(201).json(createdRoom);
        else throw 'no room created';
      } else throw 'newRoom.userIDs is empty'
    }
  } catch (error) {
    console.log("createRoom() error createing room: ", error);
    next(new HttpError(`server error, ${error}`, 500));
  }
};

module.exports.updateRoom = (req: Request, res: Response, next: NextFunction) => { };

module.exports.addNewRoomMsg = async (req: Request, res: Response, next: NextFunction) => {
  const { roomId } = req.params;
  const { msg } = req.body as { msg: Message };
  try {
    if (!msg || !roomId) throw 'no message or roomId were found in the body'
    const updatedRoom = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        messages: {
          create: {
            content: msg.content,
            senderId: msg.senderId,
            senderName: msg.senderName,
          }
        }
      },
      include: {
        messages: true
      }
    });
    return res.status(200).json(updatedRoom);

  } catch (error) {
    console.log("addNewRoomMsg() error: ", error);
    next(new HttpError(`server error, ${error}`, 500));
  }
};
