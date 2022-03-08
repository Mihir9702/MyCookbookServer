import { Router, Request, Response } from 'express'
const router = Router()

import Recipe from '../models/Recipe.model'
import Category from '../models/Category.model'

/***********************************************
             cookbook.com/api/*             
 ***********************************************/

// All Categories
router.get('/categories', (req: Request, res: Response) => {
  Category.find()
    .sort('title')
    .select('title image description')
    .then(r => res.status(200).json(r))
    .catch(() =>
      res.status(500).json({ errorMessage: 'Unable to query categories' })
    )
})

// Specific Category
router.get('/categories/:category', (req: Request, res: Response) => {
  Category.findOne({ title: req.params.category })
    .then(c => res.status(200).json(c))
    .catch(() =>
      res
        .status(500)
        .json({ errorMessage: `Unable to query ${req.params.category}` })
    )
})

// All Recipes
router.get('/recipes', (req: Request, res: Response) => {
  Recipe.find()
    .select('_id title image')
    .then(r => res.status(200).json(r))
    .catch(() =>
      res.status(500).json({ errorMessage: `Unable to query recipes` })
    )
})

// Specific Recipe
router.get('/recipes/:recipe', (req: Request, res: Response) => {
  Recipe.findOne({ title: req.params.recipe })
    .then(r => res.status(200).json(r))
    .catch(() =>
      res
        .status(500)
        .json({ errorMessage: `Unable to query recipe#${req.params.recipeID}` })
    )
})

export default router
