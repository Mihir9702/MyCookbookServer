import { Request, Response, Router } from 'express'
const router = Router()

import apiRoutes from './api.routes'

router.get("/", (req: Request, res: Response) => {
  res.json({ error: 'Specify path' })
})

// Set up Routes
router.use("/api", apiRoutes)

export default router