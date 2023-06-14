import { Request, Response } from 'express'
import { NftService } from '../service/NftService'
const nftService = new NftService()

export class NftController {
  async createNft(req: Request, res: Response) {
    const { contract_address, name, token_id } = req.body
    const nft = await nftService.create({
      contract_address,
      name,
      token_id,
    })
    return res.json(nft)
  }

  async listNfts(req: Request, res: Response) {
    const nfts = await nftService.getAll()
    return res.json(nfts)
  }
}
