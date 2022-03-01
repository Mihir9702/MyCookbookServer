import { Request, Response, Router } from 'express'
const router = Router()

import User from '@models/User.model'

// Middleware
import signupHandler from '@middleware/signupHandler'

/* ***********************************************/
/*                cookbook.com/user              */
/* ***********************************************/

// READ
router.get('/', (req: Request, res: Response) => {
  User.find().then(u => res.json(u)).catch(e => res.status(500).send(e))
})

router.get('/:id', (req: Request, res: Response) => {
  User.findById(req.params.id).then(u => res.json(u)).catch(e => res.status(503).send(e))
}) 

router.get('/create', (req: Request, res: Response) => {
  res.json('You are on the users create api')
})

// CREATE
router.post('/create', signupHandler, (req: Request, res: Response) => {
  User.create(req.body).then(u => res.json(u)).catch(e => res.status(400).send(e))
})


// UPDATE

// DELETE



export default router