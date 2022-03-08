"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cookBookSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User'
    },
    recipes: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Recipe'
        }]
});
const Cookbook = (0, mongoose_1.model)('Cookbook', cookBookSchema);
exports.default = Cookbook;
