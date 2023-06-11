import { NextFunction, Request, Response } from 'express'

export function authProtection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res.status(401).end()
  }

  const [, token] = authToken.split(' ')
  try {
    // const
  } catch (err) {}
}
