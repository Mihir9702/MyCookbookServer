import { Router } from 'express'
const router = Router()
// import auth from '../middleware/jwt.middleware'
import Category from '../models/Category.model'
import Recipe from '../models/Recipe.model'
import User from '../models/User.model'

/******************************************* 
            cookbook.com/api                  
*******************************************/

// Api Routes are handled here
import categoryRoutes from './category.routes'
router.use('/', categoryRoutes)

import userRoutes from './user.routes'
router.use('/user', userRoutes)

import cookbookRoutes from './cookbook.routes'
router.use('/cookbook', cookbookRoutes)

// * Update
router.post('/:username/update', (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    {
      name: req.body.name,
      username: req.body.username,
    }
  )
    .then(r => res.status(200).json(r))
    .catch(e => res.status(500).json(e))
})

// * Delete
router.get('/:id/delete', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(deletedUser =>
      res
        .status(200)
        .json({ status: `Successfully deleted ${deletedUser.username}` })
    )
    .catch(() =>
      res.status(500).json({ errorMessage: 'Unable to delete account' })
    )
})

// * Individual User
router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username })
    .then(u => res.json(u))
    .catch(() => res.status(503).json({ errorMessage: 'Unable to find user' }))
})

export default router
