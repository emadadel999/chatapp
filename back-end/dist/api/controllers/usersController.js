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
const httpError_1 = __importDefault(require("../helpers/httpError"));
const db_1 = require("../data/db");
module.exports.allUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currUserId = req.query.id;
    let users;
    try {
        if (currUserId) {
            users = yield db_1.prisma.user.findMany({
                where: {
                    NOT: {
                        id: currUserId
                    }
                }
            });
        }
        else {
            users = yield db_1.prisma.user.findMany();
        }
        if (!users || users.length === 0)
            return res.status(404).json(users);
        return res.status(200).json(users);
    }
    catch (error) {
        console.log("allUsers() error: ", error);
        return next(new httpError_1.default(`server error, ${error}`, 500));
    }
});
module.exports.setState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, isOnline } = req.body;
    try {
        const user = yield db_1.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                isOnline
            }
        });
        if (!user)
            res.status(404).json(user);
        return res.status(200).json(user);
    }
    catch (error) {
        console.log("setState() error: ", error);
        return next(new httpError_1.default(`server error, ${error}`, 500));
    }
});
