import { detailNft } from './opensea'

describe('detail nft opensea api call', () => {
  test('should return nft data', async () => {
    const contractAddress = '0x1a92f7381b9f03921564a437210bb9396471050c'
    const tokenId = '9888'
    const nft = await detailNft(contractAddress, tokenId)
    expect(nft).toBeDefined()
  })
})
