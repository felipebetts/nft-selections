import { AppDataSource } from '../data-source'
import { Selection } from '../entity/Selection'
import { User } from '../entity/User'
import { Service } from './Service'

interface ICreateSelection {
  name: string
  userId: number
}

export class SelectionService extends Service {
  private selectionRepository = AppDataSource.getRepository(Selection)
  constructor() {
    super(Selection)
  }

  async create({ name, userId }: ICreateSelection) {
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
}
