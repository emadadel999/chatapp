"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const db_1 = require("../data/db");
const httpError_1 = __importDefault(require("../helpers/httpError"));
const roomWithUsers = client_1.Prisma.validator()({
    include: { users: true },
});
module.exports.allRoomsForUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currUserId = req.params.userId;
    try {
        const rooms = yield db_1.prisma.room.findMany({
            where: {
                users: {
                    some: {
                        id: currUserId
                    }
                }
            }
        });
        return res.status(200).json(rooms);
    }
    catch (error) {
        console.log("allRoomsForUser() error finding user rooms: ", error);
        return next(new httpError_1.default(`server error, ${error}`, 500));
    }
});
module.exports.createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newRoom = {
        roomName: req.body.roomName,
        userIDs: req.body.userIDs,
        roomType: req.body.roomType,
    };
    try {
        const existingRoom = yield db_1.prisma.room.findFirst({
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
            return res.status(201).json(existingRoom);
        }
        else {
            if (((_a = newRoom.userIDs) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const authorId = newRoom.userIDs[0];
                const createdRoom = yield db_1.prisma.room.create({
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
                if (createdRoom)
                    return res.status(201).json(createdRoom);
                else
                    throw 'no room created';
            }
            else
                throw 'newRoom.userIDs is empty';
        }
    }
    catch (error) {
        console.log("createRoom() error createing room: ", error);
        next(new httpError_1.default(`server error, ${error}`, 500));
    }
});
module.exports.updateRoom = (req, res, next) => { };
module.exports.addNewRoomMsg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const { msg } = req.body;
    try {
        if (!msg || !roomId)
            throw 'no message or roomId were found in the body';
        const updatedRoom = yield db_1.prisma.room.update({
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
    }
    catch (error) {
        console.log("addNewRoomMsg() error: ", error);
        next(new httpError_1.default(`server error, ${error}`, 500));
    }
});
