import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Nft } from './Nft'
import { Rating } from './Rating'
import { User } from './User'

@Entity()
export class Selection {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => User, (user) => user.selections)
  user: User

  @ManyToMany(() => Nft)
  @JoinTable()
  nfts: Nft[]

  @OneToMany(() => Rating, (rating) => rating.selection)
  ratings: Rating[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
