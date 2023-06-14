import { AppDataSource } from '../data-source'
import { Nft } from '../entity/Nft'
import { Selection } from '../entity/Selection'
import { User } from '../entity/User'
import { Service } from './Service'

interface ICreateSelection {
  name: string
  userId: number
}

interface ISelectNft {
  nftId: number
  selectionId: number
  userId: number
}

export class SelectionService extends Service {
  private selectionRepository = AppDataSource.getRepository(Selection)
  constructor() {
    super(Selection)
  }

  async create({ name, userId }: ICreateSelection) {
    if (!name) {
      throw new Error('Invalid name')
    }

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({ where: { id: userId } })
    console.log('user:', user)
    if (!user) {
      throw new Error('Invalid user')
    }

    const selection = this.selectionRepository.create({
      name,
      user,
    })
    await this.selectionRepository.save(selection)

    return selection
  }

  async selectNft({ nftId, selectionId, userId }: ISelectNft) {
    const userRepository = AppDataSource.getRepository(User)
    const nftRepository = AppDataSource.getRepository(Nft)
    const selection = await this.selectionRepository.findOne({
      where: { id: selectionId },
    })
    const user = await userRepository.findOne({ where: { id: userId } })
    const nft = await nftRepository.findOne({ where: { id: nftId } })

    if (!selection || !user || !nft) {
      console.log('selection:', selection)
      console.log('user:', user)
      console.log('nft:', nft)
      throw new Error('Dados do nft invalidos')
    }

    selection.nfts = [nft]
    await this.selectionRepository.save(selection)

    return selection
  }

  async listSelectionNfts(selectionId: number) {
    const selection = await this.selectionRepository.findOne({
      where: { id: selectionId },
      relations: {
        nfts: true,
      },
    })
    if (!selection) {
      throw new Error('Selecao invalida')
    }

    return selection.nfts
  }
}
