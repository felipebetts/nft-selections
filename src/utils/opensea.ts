import axios from 'axios'
const OPENSEA_API_KEY = '8abe6cef69ba455a92ed5b0645ccbe29'

export const fetchCollectionNfts = async (slug: string) => {
  const { data: nfts } = await axios({
    method: 'get',
    url: `https://api.opensea.io/api/v1/assets?collection_slug=${slug}`,
    headers: {
      'X-API-KEY': OPENSEA_API_KEY,
    },
  })
  return nfts
}
