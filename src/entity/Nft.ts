import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm'
import { Selection } from './Selection'

@Entity()
export class Nft {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  contract_address: string

  @Column()
  description: string

  @Column()
  image_url: string

  @Column()
  name: string

  @Column()
  token_id: string

  @ManyToMany(() => Selection, (selection) => selection.nfts, { cascade: true })
  selections: Selection[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
