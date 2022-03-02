/******************************************* 
            cookbook.com/api                  
*******************************************/
import { Request, Response, Router } from 'express'
const router = Router()

// Api Routes are handled here

import recipeRoutes from './recipe.routes'
router.use('/', recipeRoutes)

import userRoutes from './user.routes'
router.use('/user', userRoutes)

export default router