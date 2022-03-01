import { Request, Response, NextFunction } from "express"

const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {

  if (req.session.user) {
    return res
      .status(401)
      .json({
        errorMessage: "You should not be logged in to make this request",
      })
  }

  next()

}

export default isLoggedOut