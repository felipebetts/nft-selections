import { Request, Response } from 'express'
import { paginateCollectionNfts } from '../utils/opensea'

export class OpenseaController {
  async listCollectionNfts(req: Request, res: Response) {
    const { slug } = req.params
    const { cursor } = req.query
    const nfts = await paginateCollectionNfts(slug, cursor && String(cursor))
    return res.json(nfts)
  }
}
