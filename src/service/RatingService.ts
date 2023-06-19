import { AppDataSource } from '../data-source'
import { Rating } from '../entity/Rating'
import { Selection } from '../entity/Selection'
import { User } from '../entity/User'
import { InvalidAuthError } from '../utils/errors'
import { Service } from './Service'

interface ICreateUpdateRating {
  selectionId: number
  userId: number
  value: number
}

// interface IUpdateRating {
//   selectionId: number
//   userId: number
//   value: number
// }

interface IDeleteRatingBySelection {
  selectionId: number
  userId: number
}

export class RatingService extends Service {
  constructor() {
    super(Rating)
  }
  private ratingRepository = AppDataSource.getRepository(Rating)

  async create({ selectionId, userId, value }: ICreateUpdateRating) {
    if (!selectionId || !userId || !value) {
      throw new Error('Dados invalidos')
    }

    if (value > 5 || value < 0) {
      throw new Error('Valor da rating deve ser entre 0 e 5')
    }

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    })
    if (!user) {
      throw new Error('Usuario nao encontrado')
    }

    const selection = await AppDataSource.getRepository(Selection).findOne({
      where: { id: selectionId },
    })
    if (!selection) {
      throw new Error('Selection nao encontrada')
    }

    const userAlreadyRatedSelection = await this.ratingRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    })
    if (userAlreadyRatedSelection) {
      console.log('userAlreadyRatedSelection:', userAlreadyRatedSelection)
      return this.update({ selectionId, userId, value })
    }

    const rating = this.ratingRepository.create({
      selection,
      user,
      value,
    })
    await this.ratingRepository.save(rating)

    return rating
  }

  async update({ selectionId, userId, value }: ICreateUpdateRating) {
    if (!selectionId) {
      throw new Error('selection invalida')
    }
    if (!userId) {
      throw new Error('usuario invalido')
    }
    if (!value || value > 5 || value < 0) {
      throw new Error('Valor da rating deve ser entre 0 e 5')
    }
    const rating = await this.ratingRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        selection: {
          id: selectionId,
        },
      },
      relations: {
        user: true,
      },
    })
    if (!rating) {
      throw new Error('Rating nao encontrada')
    }
    if (rating.user.id !== userId) {
      throw new InvalidAuthError()
    }
    rating.value = value
    this.ratingRepository.save(rating)
    return rating
  }

  async deleteRatingBySelection({
    selectionId,
    userId,
  }: IDeleteRatingBySelection) {
    if (!userId || !selectionId) {
      throw new Error('Dados fornecidos invalidos')
    }

    const rating = await this.ratingRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        selection: {
          id: selectionId,
        },
      },
      relations: {
        user: true,
      },
    })
    if (!rating) {
      throw new Error('Rating nao encontrada')
    }

    if (rating.user.id !== userId) {
      throw new InvalidAuthError()
    }

    await this.ratingRepository.delete(rating.id)
  }
}
