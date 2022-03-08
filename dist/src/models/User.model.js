"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    cookbooks: {
        type: [mongoose_1.Types.ObjectId],
        ref: 'Cookbook'
    }
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
