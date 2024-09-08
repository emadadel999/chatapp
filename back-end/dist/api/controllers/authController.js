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
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpError_1 = __importDefault(require("../helpers/httpError"));
const db_1 = require("../data/db");
module.exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        console.log("login() validation error", error);
        return next(new httpError_1.default("wrong input", 422));
    }
    const { username, password } = req.body;
    console.log("login() body username, password: ", username, password);
    try {
        const exitingUser = yield db_1.prisma.user.findFirst({
            where: {
                username,
                password
            }
        });
        if (!exitingUser) {
            console.log("login() no existingUser found");
            return next(new httpError_1.default("wrong credintials, check username or password", 422));
        }
        console.log("login() got user: ", exitingUser);
        const currentUser = {
            id: exitingUser.id,
            username: exitingUser.username,
        };
        const secret = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.PASS_PHRASE;
        const token = jsonwebtoken_1.default.sign(currentUser, secret, {
            algorithm: 'HS256',
            subject: 'chatapp:subject',
            issuer: 'chatapp:issuer',
            audience: `chatapp:audience`,
            expiresIn: "2h",
        });
        return res.status(200).json({ token });
    }
    catch (error) {
        console.log("login() error fetching user", error);
        return next(new httpError_1.default("server error", 500));
    }
});
module.exports.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        console.log("register() validation error", error);
        return next(new httpError_1.default("wrong input", 422));
    }
    const { username, email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield db_1.prisma.user.findFirst({ where: { username } });
    }
    catch (error) {
        console.log("register() error finding existingUser: ", error);
        return next(new httpError_1.default("server error", 500));
    }
    if (existingUser) {
        console.log("register() existingUser found", existingUser);
        return next(new httpError_1.default("wrong credintials, user already exists", 422));
    }
    try {
        const newUser = yield db_1.prisma.user.create({
            data: { username, email, password }
        });
        const currentUser = {
            id: newUser.id,
            username: newUser.username,
        };
        const secret = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.PASS_PHRASE;
        const token = jsonwebtoken_1.default.sign(currentUser, secret, {
            algorithm: 'HS256',
            subject: 'chatapp:subject',
            issuer: 'chatapp:issuer',
            audience: `chatapp:audience`,
            expiresIn: "2h",
        });
        return res.status(201).json({ token });
    }
    catch (error) {
        console.log("register() error creating newUser", error);
        return next(new httpError_1.default("server error", 500));
    }
});
