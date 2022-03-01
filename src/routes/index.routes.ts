import { Response, Router } from 'express'
const router = Router()

import apiRoutes from './api.routes'
import userRoutes from './user.routes'

router.get("/", (req, res: Response) => {
  res.redirect('/api')
})

// Set up Routes
router.use("/api", apiRoutes)
router.use("/user", userRoutes)

export default router