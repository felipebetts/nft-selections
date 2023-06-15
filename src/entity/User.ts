import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Rating } from './Rating'
import { Selection } from './Selection'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column({
    // select: false,
  })
  password: string

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[]

  @OneToMany(() => Selection, (selection) => selection.user)
  selections: Selection[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
