import axios from 'axios'
const OPENSEA_API_KEY = '8abe6cef69ba455a92ed5b0645ccbe29'

const openseaAPI = axios.create({
  baseURL: 'https://api.opensea.io/api/v1',
  headers: {
    'X-API-KEY': OPENSEA_API_KEY,
  },
})

export const paginateCollectionNfts = async (slug: string, cursor?: string) => {
  const limit = '20'
  let url = '/assets'
  url += `?collection_slug=${slug}&limit=${limit}`
  if (cursor) {
    url += `&cursor=${cursor}`
  }
  const { data: nfts } = await openseaAPI.get(url)
  return nfts
}

export const detailNft = async (contractAddress: string, tokenId: string) => {
  const url = `/asset/${contractAddress}/${tokenId}`
  const { data: nft } = await openseaAPI.get(url)
  return nft
}
