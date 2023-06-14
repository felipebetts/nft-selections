import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const ACCESS_SECRET = '34789v5yn23487ytgn2937482'

export interface AuthenticatedRequest extends Request {
  userId?: number
}

export function authProtection(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers.authorization
  if (!accessToken) {
    return res.status(401).json({
      error: 'Autentique-se para acessar esta rota.',
    })
  }

  try {
    const { sub } = jwt.verify(accessToken, ACCESS_SECRET)
    req.userId = Number(sub)
    return next()
  } catch (err) {
    console.error(err)
    if (err.expiredAt) {
      return res.status(401).json({
        error: 'Atualize o access_token usando o refresh_token',
      })
    }
    return res.status(401).end()
  }
}
