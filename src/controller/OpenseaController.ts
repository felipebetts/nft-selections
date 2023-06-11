import { Request, Response } from 'express'
import { fetchCollectionNfts } from '../utils/opensea'

export class OpenseaController {
  async listCollectionNfts(req: Request, res: Response) {
    const { slug } = req.params
    const nfts = await fetchCollectionNfts(slug)
    console.log('nfts:', nfts)
    return res.json(nfts)
  }
}
