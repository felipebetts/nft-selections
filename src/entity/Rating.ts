import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Selection } from './Selection'
import { User } from './User'

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: number

  @ManyToOne(() => User, (user) => user.ratings)
  user: User

  @ManyToOne(() => Selection, (selection) => selection.ratings)
  selection: Selection

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
