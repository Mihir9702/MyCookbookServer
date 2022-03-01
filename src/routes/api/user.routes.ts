import { Request, Response, Router } from 'express'
const router = Router()

import 'dotenv/config'

// Models
import User from '../../models/User.model'

// Middleware
import signupHandler from '../../middleware/signupHandler'
import auth from '../../middleware/jwt.middleware'

// Encryption
import { genSaltSync, compareSync, hashSync } from 'bcrypt'

// JWT
import { sign } from 'jsonwebtoken'


/************************************************
             cookbook.com/api/user             
************************************************/

router.get('/', (req: Request, res: Response) => {
  User.find().then(u => res.json(u)).catch(e => res.status(500).json({ message: e }))
});

// Create user 
router.get('/signup', (req: Request, res: Response) => {
  res.json({ message: 'User Signup Api' })
})

router.post('/signup', signupHandler, (req: Request, res: Response) => {
  const salt = genSaltSync(Number(process.env.SALT_ROUNDS))
  const hash = hashSync(req.body.password, salt)
  req.body.password = hash

  User.create(req.body).then(u => res.json(u)).catch(e => res.status(400).json({ message: e }))
})

router.post('/login', (req: Request, res: Response) => {


  User.findOne({ username: req.body.username })
    .then(user => {

      if (!user) return res.status(401).json({ error: 'User not found' })
      
      const checkPass = compareSync(req.body.password, user.password)

      if (checkPass) {
        const { _id, name, username } = user

        // Token payload
        const payload = { _id, name, username }

        // Create and sign the token
        const authToken = sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "6h" })

        res.status(200).json({ authToken: authToken })

      } else {
        res.status(401).json({ message: "Unable to authenticate user" })
      }

    })
    .catch(e => res.status(500).json({ message: "Internal Server Error" }))

})

router.get('/jwt', auth, (req: Request, res: Response) => {
  res.status(200).json({ message: 'You are authenticated' })
})


/*************************************************
                   Dynamic Routes               
 *************************************************/

router.get('/:user', (req: Request, res: Response) => {
  User.findOne({ username: req.params.user }).then(u => res.json(u)).catch(e => res.status(503).json({ message: e }))
})

router.get('/:user/update', (req: Request, res: Response) => {
  User.findOneAndUpdate({ username: req.params.user }, req.body).then(u => res.json(u)).catch(e => res.status(503).json({ message: e }))
})

export default router