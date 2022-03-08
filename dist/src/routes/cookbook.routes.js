"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cookbook_routes_1 = __importDefault(require("../models/Cookbook.routes"));
const Recipe_model_1 = __importDefault(require("../models/Recipe.model"));
const router = (0, express_1.Router)();
/***********************************
      cookbook.com/api/cookbook
 ***********************************/
router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});
// Creating Cookbooks | Auth
router.post('/', (req, res) => {
    // ? req.body.recipes = ['Breakfast Potatoes', 'Apple & Blackberry Crumble', 'Kiwis']
    const recipesInsideCookbook = [];
    // req.body.recipes.map(recipe => {
    //   Recipe.findById(recipe)
    //   .then(foundTheRecipe =>  {
    //     if (foundTheRecipe) { return recipesInsideCookbook.push(recipe) }
    //   }
    //   )
    //   .catch(() => 
    //       res.status(400).json({ errorMessage: 'Unable to add recipes to cookbook, Please try again.'})
    //   )
    // })
    Cookbook_routes_1.default
        .create({
        owner: req.body.owner,
        recipes: req.body.recipes
    })
        .then(createdCookbook => res.status(200).json(createdCookbook))
        .catch(() => res.status(500).json({ errorMessage: 'Unable to create cookbook, Please try again.' }));
});
// Reading Cookbook | Auth
router.get('/:id', (req, res) => {
    Cookbook_routes_1.default
        .findById(req.params.id)
        .populate('recipes')
        .then(cookbook => res.status(200).json(cookbook))
        .catch(() => res.status(500).json({ errorMessage: 'Unable to find cookbook, Please try again.' }));
});
// Updating Cookbook | Auth
router.patch('/:id/update', (req, res) => {
    const recipesInsideCookbook = [];
    req.body.recipes.map(recipe => {
        Recipe_model_1.default.findOne({ title: recipe })
            .then(foundTheRecipe => recipesInsideCookbook.push(foundTheRecipe._id))
            .catch(() => res.status(400).json({ errorMessage: 'Unable to find recipes from cookbook, Please try again.' }));
    });
    Cookbook_routes_1.default
        .findByIdAndUpdate(req.params.id, recipesInsideCookbook)
        .then(cookbook => res.status(200).json({
        status: 'Successfully Updated Cookbook',
        updated: cookbook
    }))
        .catch(() => res.status(500).json({ errorMessage: 'Unable to modify recipes in cookbook, Please try again.' }));
});
// Deleting Cookbook | Auth
router.delete('/:id/delete', (req, res) => {
    Cookbook_routes_1.default
        .findByIdAndDelete(req.params.id)
        .then(deletedCookbook => res.status(200).json({
        status: 'Successfully Deleted',
        removed: deletedCookbook
    }))
        .catch(() => res.status(500).json({ status: 'Deletion Failed' }));
});
exports.default = router;
