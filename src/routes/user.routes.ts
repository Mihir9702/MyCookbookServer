import 'dotenv/config'
import { Request, Response, Router } from 'express'
const router = Router()

import { PayloadInfo } from '../interfaces/payload.interface'

// Models
import User from '../models/User.model'
// import { UserRequest } from 'src/interfaces/user.interface'

// Middleware
import signupHandler from '../middleware/signupHandler'
import auth from '../middleware/jwt.middleware'

// Encryption
import { genSaltSync, compareSync, hashSync } from 'bcryptjs'

// JWT
import jwt from 'jsonwebtoken'

/***********************************************
             cookbook.com/api/user             
 ***********************************************/

// * Signup POST
router.post('/signup', (req: Request, res: Response) => {
  const SALTROUNDS = 10
  const salt = genSaltSync(SALTROUNDS)
  const hash = hashSync(req.body.password, salt)
  req.body.password = hash

  User.create(req.body)
    .then(u => res.json(u))
    .catch(() => res.status(400).json({ errorMessage: 'User Creation Error' }))
})

// * Login POST
router.post('/login', (req: Request, res: Response) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      // Couldn't find an account
      if (!user)
        return res.status(401).json({ errorMessage: 'Account not found' })

      // Comparing passwords
      const checkPass = compareSync(req.body.password, user.password)
      if (checkPass) {
        const { _id, name, username } = user

        // Token payload
        const payload = { _id, name, username }

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h',
        })

        res.status(201).json({ ...payload, authToken: authToken })
      } else {
        res
          .status(401)
          .json({ errorMessage: 'Username or Password is incorrect' })
      }
    })
    .catch(() =>
      res.status(504).json({ errorMessage: 'Internal Server Error' })
    )
})

/*************************************************
                   Dynamic Routes               
 *************************************************/

export default router
