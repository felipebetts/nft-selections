import { EntityTarget, Repository } from 'typeorm'
import { AppDataSource } from '../data-source'

export class Service {
  private entity: EntityTarget<any>
  private repository: Repository<any>

  constructor(entity: EntityTarget<any>) {
    this.entity = entity
    this.repository = AppDataSource.getRepository(this.entity)
  }

  async getAll() {
    const allItems = await this.repository.find()
    return allItems
  }

  async delete(id: number) {
    const itemExists = await this.repository.findOne({ where: { id } })
    if (!itemExists) {
      throw new Error('item nao encontrado')
    }
    return this.repository.delete(id)
  }
}
