import { Request, Response, Router } from 'express'
const router = Router()

import userRoutes from './user.routes'

router.get('/', (req: Request, res: Response) => {
  res.json('Hitting api')
})

router.use("/user", userRoutes)

export default router