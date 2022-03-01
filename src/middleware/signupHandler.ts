import User from '../models/User.model'
import { Request, Response, NextFunction } from 'express'

const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
  
  const { name, username, password } =  req.body

  const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

  const user = await User.find({ username: username })

  if (user) return res.status(400).send({ error: 'Account has already been created' })
  if (special.test(name)) return res.status(400).json({ error: 'Name cannot contain special characers' })
  if (username.length < 3) return res.status(400).json({ error: 'Username must contain at least 3 characters' })
  if (password.length < 8) return res.status(400).json({ error: 'Password must contain at least 8 characters' })

  next()
}

export default signupHandler