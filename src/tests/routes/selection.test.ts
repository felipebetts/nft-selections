import app from '../../app'
import { AppDataSource } from '../../data-source'
import request from 'supertest'

describe('selection routes', () => {
  let userId: number
  let accessToken: string
  let selectionId: number
  let nftId: number
  const userData = {
    name: 'spiderman',
    email: 'spiderman@avengers.com',
    password: '1234',
  }
  const selectionData = {
    name: 'fast-and-curious',
  }
  const nftData = {
    contract_address: '0x1a92f7381b9f03921564a437210bb9396471052c',
    name: 'Cool Cat #9888',
    token_id: '9888',
  }

  const createUser = async () => {
    const { body } = await request(app).post('/users').send(userData)
    userId = body.id
  }
  const login = async () => {
    const loginData = {
      email: 'spiderman@avengers.com',
      password: '1234',
    }
    const { body } = await request(app).post('/users/auth').send(loginData)
    accessToken = body.accessToken
  }
  const deleteUser = async () => {
    await request(app).delete(`/users/${userId}`)
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
    await createUser()
    await login()
    await createNft()
  })
  afterAll(async () => {
    await deleteNft()
    await deleteUser()
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
    expect(statusCode).toBe(200)
    selectionId = body.id
  })

  test('should not add nft to selection if no auth', async () => {
    const { statusCode } = await request(app).post(
      `/selections/${selectionId}/select-nft/${nftId}`
    )

    expect(statusCode).toBe(401)
  })

  test('should add nft to selection', async () => {
    const { body, statusCode } = await request(app) // { body, statusCode }
      .post(`/selections/${selectionId}/select-nft/${nftId}`)
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
    const { body, statusCode } = await request(app)
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
    const { body, statusCode } = await request(app)
      .delete(`/selections/${selectionId}`)
      .set('Authorization', accessToken)
    expect(statusCode).toBe(204)
  })
})
