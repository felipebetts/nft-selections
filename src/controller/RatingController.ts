import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../middleware/auth'
import { RatingService } from '../service/RatingService'

const ratingService = new RatingService()

export class RatingController {
  async create(req: AuthenticatedRequest, res: Response) {
    const selectionId = Number(req.params.selectionId)
    const { userId } = req
    const { value } = req.body
    const rating = await ratingService.create({ selectionId, userId, value })
    return res.json(rating)
  }

  async delete(req: AuthenticatedRequest, res: Response) {
    const selectionId = Number(req.params.selectionId)
    const { userId } = req
    await ratingService.deleteRatingBySelection({ selectionId, userId })
    return res.status(204).end()
  }

  async update(req: AuthenticatedRequest, res: Response) {
    const selectionId = Number(req.params.selectionId)
    const { userId } = req
    const { value } = req.body
    const rating = await ratingService.update({ selectionId, userId, value })
    return res.json(rating)
  }

  async selectionRating(req: Request, res: Response) {
    const selectionId = Number(req.params.selectionId)
    const rating = await ratingService.detailSelectionRating(selectionId)
    return res.json(rating)
  }
}
