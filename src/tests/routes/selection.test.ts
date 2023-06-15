import app from '../../app'
import { AppDataSource } from '../../data-source'
import request from 'supertest'

describe('user routes', () => {
  let userId: number
  let accessToken: string
  let selectionId: number
  let nftId: number
  let nextAsset: string
  const userData = {
    name: 'thor',
    email: 'thor@avengers.com',
    password: '1234',
  }
  const selectionData = {
    name: 'fast-and-curious',
  }
  const nftData = {
    contract_address: '0x1a92f7381b9f03921564a437210bb9396471051c',
    name: 'Cool Cat #9888',
    token_id: '9888',
  }

  const login = async () => {
    const loginData = {
      email: 'thor@avengers.com',
      password: '1234',
    }
    const { body } = await request(app).post('/users/auth').send(loginData)
    accessToken = body.accessToken
  }

  const createNft = async () => {
    const { body } = await request(app)
      .post('/nfts')
      .send(nftData)
      .set('Authorization', accessToken)
    nftId = body.id
  }
  const deleteNft = async () => {
    await request(app)
      .delete(`/nfts/${nftId}`)
      .set('Authorization', accessToken)
  }

  beforeAll(async () => {
    await AppDataSource.initialize()
    const { body } = await request(app).post('/users').send(userData)
    userId = body.id
    await login()
    await createNft()
  })
  afterAll(async () => {
    await request(app).delete(`/users/${userId}`)
    await deleteNft()
  })

  test('should not create selection if no auth', async () => {
    const { statusCode } = await request(app)
      .post('/selections')
      .send(selectionData)
    expect(statusCode).toBe(401)
  })

  test('should create selection', async () => {
    const { body, statusCode } = await request(app)
      .post('/selections')
      .send(selectionData)
      .set('Authorization', accessToken)
    // console.log('body:', body)
    // console.log('accessToken:', accessToken)
    expect(statusCode).toBe(200)
    selectionId = body.id
  })

  test('should not add nft to selection if no auth', async () => {
    const { statusCode } = await request(app)
      .post(`/selections/${selectionId}/select-nft`)
      .send({ nftId })

    expect(statusCode).toBe(401)
  })

  test('should add nft to selection', async () => {
    const { body, statusCode } = await request(app)
      .post(`/selections/${selectionId}/select-nft`)
      .send({ nftId })
      .set('Authorization', accessToken)

    expect(statusCode).toBe(200)

    const properties = [
      'id',
      'name',
      'nfts',
      'user',
      'created_at',
      'updated_at',
    ]
    properties.forEach((property) => {
      expect(body).toHaveProperty(property)
    })
  })

  test('should not remove nft from selection if no auth', async () => {
    const { statusCode } = await request(app).delete(
      `/selections/${selectionId}/remove-nft/${nftId}`
    )
    expect(statusCode).toBe(401)
  })

  test('should remove nft from selection', async () => {
    const { statusCode } = await request(app)
      .delete(`/selections/${selectionId}/remove-nft/${nftId}`)
      .set('Authorization', accessToken)
    expect(statusCode).toBe(204)
  })

  test('should not delete selection if no auth', async () => {
    const { statusCode } = await request(app).delete(
      `/selections/${selectionId}`
    )
    expect(statusCode).toBe(401)
  })

  test('should delete selection', async () => {
    const { statusCode } = await request(app)
      .delete(`/selections/${selectionId}`)
      .set('Authorization', accessToken)
    expect(statusCode).toBe(204)
  })
})
