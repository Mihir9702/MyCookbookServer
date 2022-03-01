import { Express, Request, Response, ErrorRequestHandler } from 'express'

const error = (app: Express) => {
  app.use((req: Request, res: Response) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ errorMessage: "This route does not exist" });
  });

  app.use((err: ErrorRequestHandler, req: Request, res: Response) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).json({
        errorMessage: "Internal server error. Check the server console",
      });
    }
  });
};

export default error