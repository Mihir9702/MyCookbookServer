"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Category_model_1 = __importDefault(require("../models/Category.model"));
axios_1.default
    .get('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => {
    response.data.categories.map(individualFoodCategories => {
        individualFoodCategories.strCategoryDescription = individualFoodCategories.strCategoryDescription.replace('/\/\r\n\//', 'g');
        Category_model_1.default.create({
            title: individualFoodCategories.strCategory,
            image: individualFoodCategories.strCategoryThumb,
            description: individualFoodCategories.strCategoryDescription
        })
            .then(newCreatedCategory => newCreatedCategory)
            .catch(e => ({ message: 'Category Creation Error', error: e }));
    });
})
    .catch(e => ({ message: 'Axios Request Error', error: e }));
const categories = [
    'Beef',
    'Chicken',
    'Dessert',
    'Lamb',
    'Miscellaneous',
    'Pasta',
    'Pork',
    'Seafood',
    'Side',
    'Starter',
    'Vegan',
    'Vegetarian',
    'Breakfast',
    'Goat'
];
categories.map(c => {
    axios_1.default
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`)
        .then(response => {
        response.data.meals.map(meal => {
            Category_model_1.default.findOneAndUpdate({ title: c }, { $push: { recipes: meal } })
                .then(ar => ar)
                .catch(er => er);
        });
    });
});
