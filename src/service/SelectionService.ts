import { AppDataSource } from '../data-source'
import { Nft } from '../entity/Nft'
import { Selection } from '../entity/Selection'
import { User } from '../entity/User'
import { InvalidAuthError } from '../utils/errors'
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

interface IDeleteSelectionNft {
  nftId: number
  selectionId: number
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
      relations: {
        nfts: true,
        user: true,
      },
    })
    const user = await userRepository.findOne({ where: { id: userId } })
    const nft = await nftRepository.findOne({ where: { id: nftId } })

    if (!selection || !user || !nft) {
      throw new Error('Dados do nft invalidos')
    }

    if (selection.user.id !== user.id) {
      throw new InvalidAuthError()
    }

    const selectionNftsIds = selection.nfts.map((item) => item.id)

    if (selectionNftsIds.includes(nft.id)) {
      throw new Error('Nft ja esta na selecao')
    }

    selection.nfts = [...selection.nfts, nft]
    await this.selectionRepository.save(selection)

    return selection
  }

  async deleteNftFromSelection({ nftId, selectionId }: IDeleteSelectionNft) {
    const selection = await this.selectionRepository.findOne({
      where: { id: selectionId },
      relations: {
        nfts: true,
      },
    })
    selection.nfts = selection.nfts.filter((nft) => nft.id !== nftId)
    await this.selectionRepository.save(selection)
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
