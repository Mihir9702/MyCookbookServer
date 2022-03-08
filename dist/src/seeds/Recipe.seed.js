"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Category_model_1 = __importDefault(require("../models/Category.model"));
const Recipe_model_1 = __importDefault(require("../models/Recipe.model"));
Category_model_1.default
    .find()
    .then(all => {
    all.map(cat => {
        cat.recipes.map(re => {
            axios_1.default.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${re.idMeal}`)
                .then(response => {
                response.data.meals.map(recipeInfo => {
                    const instructions = recipeInfo.strInstructions.replace(/\r?\n|\r/g, " ");
                    const { strMeal, strCategory, strMealThumb } = recipeInfo;
                    const { strMeasure, strIngredient } = recipeInfo;
                    const recipe = { title: strMeal, category: strCategory, image: strMealThumb, ingredients: [strMeasure, strIngredient], instructions: instructions };
                    Recipe_model_1.default.create(recipe)
                        .then(recipe => recipe)
                        .catch(() => 'Recipe Creation error');
                });
            });
        });
    });
}).catch(e => `err${e}`);
