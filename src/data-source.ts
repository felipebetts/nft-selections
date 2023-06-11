import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Nft } from './entity/Nft'
import { Selection } from './entity/Selection'
import { Rating } from './entity/Rating'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, Nft, Selection, Rating],
  migrations: [],
  subscribers: [],
})
