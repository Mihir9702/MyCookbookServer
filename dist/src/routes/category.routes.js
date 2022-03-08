"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Recipe_model_1 = __importDefault(require("../models/Recipe.model"));
const Category_model_1 = __importDefault(require("../models/Category.model"));
/***********************************************
             cookbook.com/api/*
 ***********************************************/
// All Categories
router.get('/categories', (req, res) => {
    Category_model_1.default.find()
        .sort('title')
        .select('title image description')
        .then(r => res.status(200).json(r))
        .catch(() => res.status(500).json({ errorMessage: 'Unable to query categories' }));
});
// Specific Category
router.get('/categories/:category', (req, res) => {
    Category_model_1.default.findOne({ title: req.params.category })
        .then(c => res.status(200).json(c))
        .catch(() => res
        .status(500)
        .json({ errorMessage: `Unable to query ${req.params.category}` }));
});
// All Recipes
router.get('/recipes', (req, res) => {
    Recipe_model_1.default.find()
        .select('_id title image')
        .then(r => res.status(200).json(r))
        .catch(() => res.status(500).json({ errorMessage: `Unable to query recipes` }));
});
// Specific Recipe
router.get('/recipes/:recipe', (req, res) => {
    Recipe_model_1.default.findOne({ title: req.params.recipe })
        .then(r => res.status(200).json(r))
        .catch(() => res
        .status(500)
        .json({ errorMessage: `Unable to query recipe#${req.params.recipeID}` }));
});
exports.default = router;
