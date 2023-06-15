import { AppDataSource } from '../data-source'
import { Nft } from '../entity/Nft'
import { detailNft } from '../utils/opensea'
import { Service } from './Service'

interface ICreateNft {
  contract_address: string
  token_id: string
}

export class NftService extends Service {
  private nftRepository = AppDataSource.getRepository(Nft)
  constructor() {
    super(Nft)
  }

  async create({ contract_address, token_id }: ICreateNft) {
    if (!contract_address || !token_id) {
      throw new Error('Nft invalido')
    }
    const nftAlreadyExists = await this.nftRepository.findOne({
      where: { contract_address },
    })
    if (nftAlreadyExists) {
      throw new Error('Nft ja existe')
    }

    const { name, description, image_url } = await detailNft(
      contract_address,
      token_id
    )

    const nft = this.nftRepository.create({
      contract_address,
      description,
      image_url,
      name,
      token_id,
    })
    await this.nftRepository.save(nft)

    return nft
  }
}
