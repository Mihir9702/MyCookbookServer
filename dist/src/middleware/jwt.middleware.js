"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_jwt_1 = __importDefault(require("express-jwt"));
const tokenFromHeaders_1 = __importDefault(require("./tokenFromHeaders"));
const auth = (0, express_jwt_1.default)({
    secret: process.env.TOKEN_SECRET ||
        '7890218730130981093809128309217073120983780912807617295401571',
    algorithms: ['HS256'],
    requestProperty: 'payload',
    getToken: tokenFromHeaders_1.default,
});
exports.default = auth;
