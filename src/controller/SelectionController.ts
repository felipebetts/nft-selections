import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../middleware/auth'
import { SelectionService } from '../service/SelectionService'

const selectionService = new SelectionService()

export class SelectionController {
  async createSelection(req: AuthenticatedRequest, res: Response) {
    const { name } = req.body
    const { userId } = req
    const selection = await selectionService.create({ name, userId })
    return res.json(selection)
  }

  async selectNft(req: AuthenticatedRequest, res: Response) {
    const { selectionId, nftId } = req.params
    const { userId } = req
    const selection = await selectionService.selectNft({
      nftId: Number(nftId),
      selectionId: Number(selectionId),
      userId,
    })
    return res.json(selection)
  }

  async deleteNftFromSelection(req: AuthenticatedRequest, res: Response) {
    const { nftId, selectionId } = req.params
    await selectionService.deleteNftFromSelection({
      nftId: Number(nftId),
      selectionId: Number(selectionId),
    })
    return res.status(204).end()
  }

  async listSelectionNfts(req: Request, res: Response) {
    const selectionId = Number(req.params.selectionId)
    const nfts = await selectionService.listSelectionNfts(selectionId)
    return res.json(nfts)
  }

  async delete(req: Request, res: Response) {
    const selectionId = Number(req.params.id)
    await selectionService.delete(selectionId)
    return res.status(204).end()
  }
}
