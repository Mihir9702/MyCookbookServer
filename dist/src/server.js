"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connect_1 = __importDefault(require("./server/connect"));
app_1.default.listen(5002, () => (0, connect_1.default)(app_1.default));
exports.default = app_1.default;
