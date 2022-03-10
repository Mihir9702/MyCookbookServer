import { Router, Request, Response } from 'express'
import { PayloadInfo } from '../interfaces/payload.interface'
import { Types } from 'mongoose'

import Cookbook from '../models/Cookbook.routes'
import Recipe from '../models/Recipe.model'
import User from '../models/User.model'

const router = Router()

/***********************************
      cookbook.com/api/cookbook
 ***********************************/

router.get('/:user/my-cookbook', (req: Request, res: Response) => {
  Cookbook.find({ owner: req.params.user })
    .then(cb => {
      res.status(200).json(cb)
    })
    .catch(() =>
      res.status(502).json({ errorMessage: 'Internal Server Error' })
    )
})

// Creating Cookbooks | Auth
router.post('/:user/my-cookbook', (req: Request, res: Response) => {
  Cookbook.create({
    owner: req.body.owner,
    recipes: req.body.recipes,
  })
    .then(createdCookbook => res.status(200).json(createdCookbook))
    .catch(() =>
      res
        .status(500)
        .json({ errorMessage: 'Unable to create cookbook, Please try again.' })
    )
})

// Reading Cookbook | Auth
router.get('/:id', (req: PayloadInfo, res: Response) => {
  Cookbook.findById(req.params.id)
    .populate('recipes')
    .then(cookbook => res.status(200).json(cookbook))
    .catch(() =>
      res
        .status(500)
        .json({ errorMessage: 'Unable to find cookbook, Please try again.' })
    )
})

// Updating Cookbook | Auth
router.patch('/:id/update', (req: Request, res: Response) => {
  const recipesInsideCookbook: Array<Types.ObjectId> = []

  req.body.recipes.map(recipe => {
    Recipe.findOne({ title: recipe })
      .then(foundTheRecipe => recipesInsideCookbook.push(foundTheRecipe._id))
      .catch(() =>
        res.status(400).json({
          errorMessage:
            'Unable to find recipes from cookbook, Please try again.',
        })
      )
  })

  Cookbook.findByIdAndUpdate(req.params.id, recipesInsideCookbook)
    .then(cookbook =>
      res.status(200).json({
        status: 'Successfully Updated Cookbook',
        updated: cookbook,
      })
    )
    .catch(() =>
      res.status(500).json({
        errorMessage: 'Unable to modify recipes in cookbook, Please try again.',
      })
    )
})

// Deleting Cookbook | Auth
router.delete('/:id/delete', (req: Request, res: Response) => {
  Cookbook.findByIdAndDelete(req.params.id)
    .then(deletedCookbook =>
      res.status(200).json({
        status: 'Successfully Deleted',
        removed: deletedCookbook,
      })
    )
    .catch(() => res.status(500).json({ status: 'Deletion Failed' }))
})

export default router
