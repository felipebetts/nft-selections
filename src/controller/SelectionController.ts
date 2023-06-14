import { Response } from 'express'
import { AuthenticatedRequest } from '../middleware/auth'
import { SelectionService } from '../service/SelectionService'

const selectionService = new SelectionService()

export class SelectionController {
  async createSelection(req: AuthenticatedRequest, res: Response) {
    const { name } = req.body
    const { userId } = req
    const selection = await selectionService.create({ name, userId })
    const result = {
      name,
      userId,
      selection,
    }
    return res.json(result)
  }
}
