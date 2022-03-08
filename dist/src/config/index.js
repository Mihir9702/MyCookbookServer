"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Main framework of Nodejs to create api
const express_1 = __importDefault(require("express"));
// Environment variables
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Cross Origin Resource Sharing | Only allow server to accept form requests from the same domain
const cors_1 = __importDefault(require("cors"));
// Middleware configuration
const app = (app) => {
    app.set("trust proxy", 1);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cors_1.default)({
        credentials: true,
        origin: process.env.ORIGIN,
    }));
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cookie_parser_1.default)());
};
exports.default = app;
