import { Request, Response } from 'express'

export class UserController {
  // private userService =
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body
  }
}
