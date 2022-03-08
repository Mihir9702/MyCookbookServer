"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../server/index"));
const index_2 = __importDefault(require("../config/index"));
const error_handling_1 = __importDefault(require("../error-handling"));
const connect = (app) => {
    console.log(`You are now connected to http://localhost:5002`);
    (0, index_1.default)();
    (0, index_2.default)(app);
    (0, error_handling_1.default)(app);
};
exports.default = connect;
