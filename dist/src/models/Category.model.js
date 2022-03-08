"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    title: String,
    image: String,
    description: String,
    recipes: {
        type: [{
                strMeal: String,
                strMealThumb: String,
                idMeal: String
            }],
        unique: true
    }
});
const Category = (0, mongoose_1.model)('Category', categorySchema);
exports.default = Category;
