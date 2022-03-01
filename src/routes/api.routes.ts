/******************************************* 
          cookbook.com/api                  
*******************************************/

import { Request, Response, Router } from 'express'
const router = Router()



router.get('/', (req: Request, res: Response) => {
})

import axios from 'axios'




// Routes are handled here
import userRoutes from './api/user.routes'
router.use("/user", userRoutes)

export default router