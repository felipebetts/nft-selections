import { Request, Response } from 'express'
import { UserService } from '../service/UserService'
const userService = new UserService()

export class UserController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body
    const tokens = await userService.authenticate({
      email,
      password,
    })

    return res.json(tokens)
  }

  async refreshAccessToken(req: Request, res: Response) {
    const { refresh_token } = req.body
    const tokens = await userService.refreshAccessToken(refresh_token)
    return res.json(tokens)
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body
    const user = await userService.create({
      name,
      email,
      password,
    })
    return res.json(user)
  }

  async list(req: Request, res: Response) {
    const users = await userService.getAll()
    return res.json(users)
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id)
    console.log(id)
    await userService.delete(id)
    return res.json({
      message: 'Usuario deletado com sucesso',
    })
  }
}
