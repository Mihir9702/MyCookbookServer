import 'dotenv/config'

import { Request, Response, Router } from 'express'
const router = Router()

import { PayloadInfo } from '../interfaces/payload.interface'

// Models
import User from '../models/User.model'
// import { UserRequest } from 'src/interfaces/user.interface'

// Middleware
import signupHandler from '../middleware/signupHandler';
import auth from '../middleware/jwt.middleware'

// Encryption
import { genSaltSync, compareSync, hashSync } from 'bcrypt'

// JWT
import { sign } from 'jsonwebtoken'

/***********************************************
             cookbook.com/api/user             
 ***********************************************/

// * Signup POST
router.post('/signup', signupHandler, (req: Request, res: Response) => {


  const salt = genSaltSync(Number(process.env.SALT_ROUNDS))
  const hash = hashSync(req.body.password, salt)
  req.body.password = hash

  User
  .create(req.body)
  .then(u => res.json(u))
  .catch(() => res.status(400).json({ errorMessage: 'User Creation Error' }))

})

// * Login POST
router.post('/login', (req: Request, res: Response) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) return res.status(401).json({ errorMessage: 'User not found' })
      const checkPass = compareSync(req.body.password, user.password)
      if (checkPass) {
        const { _id, name, username } = user

        // Token payload
        const payload = { _id, name, username }

        // Create and sign the token
        const authToken = sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '6h' })

        // TODO | NOW: Sending Auth Token | LATER: Store token on user's browser
        res.status(200).json({ authToken: authToken })
      } else {
        res.status(401).json({ errorMessage: 'Unable to authenticate user' })
      }
    })
    .catch(() => res.status(500).json({ errorMessage: 'Internal Server Error' }))
})

//  TODO | NOW: Testing JWT - Success | LATER: Setup middleware for routes
router.get('/jwt', auth, (req: Request, res: Response) => {
  res.status(200).json({ status: 'You are authenticated' })
})

router.get('/:id/delete', (req: PayloadInfo, res: Response) => {
  User.findByIdAndRemove(req.params.id)
  .then(deletedUser => res.status(200).json({ status: `Successfully deleted ${deletedUser.username}` })) 
  .catch(() => res.status(500).json({ errorMessage: 'Unable to delete account' }))
})

/*************************************************
                   Dynamic Routes               
 *************************************************/

// * Individual User
router.get('/:user', (req: Request, res: Response) => {
  User
  .findOne({ username: req.params.user })
  .then(u => res.json(u))
  .catch(() => res.status(503).json({ errorMessage: 'Unable to find user' }))
})

// * Update said user
router.get('/:user/update', (req: Request, res: Response) => {
  User
  .findOneAndUpdate({ username: req.params.user }, req.body)
  .then(u => res.json(u))
  .catch(() => res.status(503).json({ errorMessage: 'Unable to update user' }))
})


export default router