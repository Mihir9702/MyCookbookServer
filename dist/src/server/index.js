"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const consts_1 = require("./consts");
const Mongoose = () => {
    mongoose_1.default
        .connect(consts_1.MONGO_URI)
        .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
        .catch(e => console.error('Error connecting to mongo: ', e));
};
exports.default = Mongoose;
