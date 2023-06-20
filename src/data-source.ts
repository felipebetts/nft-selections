import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Nft } from './entity/Nft'
import { Selection } from './entity/Selection'
import { Rating } from './entity/Rating'

const isDevEnv = process.env.NODE_ENV === 'development'

export const AppDataSource = new DataSource({
  type: isDevEnv ? 'mysql' : 'sqlite',
  host: isDevEnv && 'db',
  database: isDevEnv ? 'nft-selections' : 'test-db.sqlite',
  port: isDevEnv && 3306,
  username: isDevEnv && 'admin',
  password: isDevEnv && 'password',
  synchronize: true,
  logging: false,
  entities: [User, Nft, Selection, Rating],
  migrations: [],
  subscribers: [],
})
