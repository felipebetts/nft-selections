import axios from 'axios'
const OPENSEA_API_KEY = '8abe6cef69ba455a92ed5b0645ccbe29'

export const paginateCollectionNfts = async (slug: string, cursor?: string) => {
  const limit = '20'
  const url = new URL('https://api.opensea.io/api/v1/assets')
  url.searchParams.set('collection_slug', slug)
  url.searchParams.set('limit', limit)
  if (cursor) {
    url.searchParams.set('cursor', cursor)
  }
  const { data: nfts } = await axios({
    method: 'get',
    url: url.toString(),
    headers: {
      'X-API-KEY': OPENSEA_API_KEY,
    },
  })
  return nfts
}
