import { Request, Response, NextFunction } from 'express'

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {

  if (!req.session.user) {
    return res
      .status(403)
      .json({ errorMessage: "You must be logged in to see this page" })
  }

  req.user = req.session.user
  next()

}
