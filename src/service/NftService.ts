import { Nft } from '../entity/Nft'
import { Service } from './Service'

export class NftService extends Service {
  constructor() {
    super(Nft)
  }
}
