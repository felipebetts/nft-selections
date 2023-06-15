import request from 'supertest'
import app from '../../app'
import { AppDataSource } from '../../data-source'

describe('nft routes', () => {
  let userId: number
  let accessToken: string
  let nftId: number
  let nextAsset: string
  const userData = {
    name: 'thor',
    email: 'thor@avengers.com',
    password: '1234',
  }
  const nftData = {
    contract_address: '0x1a92f7381b9f03921564a437210bb9396471051c',
    name: 'Cool Cat #9888',
    token_id: '9888',
  }

  const createUser = async () => {
    const { body } = await request(app).post('/users').send(userData)
    userId = body.id
  }
  const login = async () => {
    const loginData = {
      email: 'thor@avengers.com',
      password: '1234',
    }
    const { body } = await request(app).post('/users/auth').send(loginData)
    accessToken = body.accessToken
  }
  const deleteUser = async () => {
    await request(app).delete(`/users/${userId}`)
  }

  beforeAll(async () => {
    await AppDataSource.initialize()
    await createUser()
    await login()
  })
  afterAll(async () => {
    await deleteUser()
  })

  test('should not create nft if no auth', async () => {
    const { statusCode } = await request(app).post('/nfts').send(nftData)
    expect(statusCode).toBe(401)
  })

  test('should create nft item', async () => {
    const { body, statusCode } = await request(app)
      .post('/nfts')
      .send(nftData)
      .set('Authorization', accessToken)
    expect(statusCode).toBe(200)

    const properties = [
      'id',
      'name',
      'contract_address',
      'token_id',
      'created_at',
      'updated_at',
    ]
    properties.forEach((property) => {
      expect(body).toHaveProperty(property)
    })
    nftId = body.id
  })

  test('should return nft list', async () => {
    const { body, statusCode } = await request(app).get('/nfts')
    expect(statusCode).toBe(200)
  })

  test('should return nft list from collection fethed from opensea api', async () => {
    const slug = 'cool-cats-nft'
    const { body, statusCode } = await request(app).get(
      `/nfts/collection/${slug}`
    )
    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('next')
    expect(body).toHaveProperty('previous')
    expect(body).toHaveProperty('assets')
    nextAsset = body.next
  })

  test('should paginate assets from opensea api', async () => {
    const slug = 'cool-cats-nft'
    const { body, statusCode } = await request(app).get(
      `/nfts/collection/${slug}?cursor=${nextAsset}`
    )
    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('next')
    expect(body).toHaveProperty('previous')
    expect(body).toHaveProperty('assets')
  })

  test('should not delete nft if no auth', async () => {
    const { statusCode } = await request(app).delete(`/nfts/${nftId}`)
    expect(statusCode).toBe(401)
  })

  test('should delete nft', async () => {
    const { statusCode } = await request(app)
      .delete(`/nfts/${nftId}`)
      .set('Authorization', accessToken)
    expect(statusCode).toBe(204)
  })
})
