import User from '../models/User.model'
import { Request, Response, NextFunction } from 'express'

const signupHandler = (req: Request, res: Response, next: NextFunction) => {

  const { name, username, password } = req.body

  const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

  User.findOne({ username: username })
  .then(user => {
    if (user) return res.status(400).send({ message: 'Account has already been created' })
    if (special.test(name)) return res.status(400).json({ message: 'Name cannot contain special characers' })
    if (username.length < 3) return res.status(400).json({ message: 'Username must contain at least 3 characters' })
    if (password.length < 8) return res.status(400).json({ message: 'Password must contain at least 8 characters' })
  })
  .catch(e => res.status(500).json({ message: `Internal Server Error: ${e}` }))

  next()
}

export default signupHandler