import { Router, Request, Response } from 'express'
const router = Router()

import Category from '../models/Catagory.model'
import Recipe from '../models/Recipe.model'

// All Categories 
router.get('/categories', (req: Request, res: Response) => {
  Category
    .find()
    .select('title image description')
    .then(r => res.json(r))
    .catch(() => res.json({ errorMessage: ` Unable to query "categories" ` }))
})

// Specific Category
router.get('/categories/:category', (req: Request, res: Response) => {
  Category
    .findOne({ name: req.params.category })
    .then(c => res.json(c.recipes))
    .catch(() => res.json({ errorMessage: ` Unable to query "${req.params.category}" ` }))
})

router.get('/recipes', (req: Request, res: Response) => {
  Recipe
    .find()
    .then(r => res.json(r))
    .catch(() => res.json({ errorMessage: `Unable to query "recipes" `}))
})

// Specific Recipe
router.get('/recipes/:id', (req: Request, res: Response) => {
  Recipe
    .findOne({ id: req.params.recipeID })
    .then(r => res.json(r))
    .catch(() => res.json({ errorMessage: ` Unable to query "recipe#${req.params.recipeID}" `}))
})

export default router

