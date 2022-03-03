import { Router } from 'express'
const router = Router()
// import auth from '../middleware/jwt.middleware'


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

export default router