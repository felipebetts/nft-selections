import { AppDataSource } from '../../data-source'
import request from 'supertest'
import app from '../../app'

describe('rating routes', () => {
  let userId: number
  let accessToken: string
  let selectionId: number
  const createUser = async () => {
    const userData = {
      name: 'strange',
      email: 'strange@avengers.com',
      password: '1234',
    }
    const { body } = await request(app).post('/users').send(userData)
    userId = body.id
  }
  const deleteUser = async () => {
    await request(app).delete(`/users/${userId}`)
  }
  const login = async () => {
    const loginData = {
      email: 'strange@avengers.com',
      password: '1234',
    }
    const { body } = await request(app).post('/users/auth').send(loginData)
    accessToken = body.accessToken
  }
  const createSelection = async () => {
    const selectionData = {
      name: 'fast-and-curious',
    }
    const { body } = await request(app)
      .post('/selections')
      .send(selectionData)
      .set('Authorization', accessToken)
    selectionId = body.id
  }
  const deleteSelection = async () => {
    await request(app)
      .delete(`/selections/${selectionId}`)
      .set('Authorization', accessToken)
  }

  beforeAll(async () => {
    await AppDataSource.initialize()
    await createUser()
    await login()
    await createSelection()
  })
  afterAll(async () => {
    await deleteSelection()
    await deleteUser()
  })

  test('should not create rating if no auth', async () => {
    const { statusCode } = await request(app)
      .post(`/ratings/${selectionId}`)
      .send({
        value: 4,
      })
    expect(statusCode).toBe(401)
  })

  test('should create rating', async () => {
    const { statusCode } = await request(app)
      .post(`/ratings/${selectionId}`)
      .send({
        value: 4,
      })
      .set('Authorization', accessToken)
    expect(statusCode).toBe(200)
  })

  test('should not update rating if no auth', async () => {
    const { statusCode } = await request(app).put(`/ratings/${selectionId}`)
    expect(statusCode).toBe(401)
  })

  test('should update rating', async () => {
    const { body, statusCode } = await request(app)
      .put(`/ratings/${selectionId}`)
      .set('Authorization', accessToken)
      .send({ value: 4.5 })
    expect(statusCode).toBe(200)
  })

  test('should detail selection ratings', async () => {
    const { body, statusCode } = await request(app).get(
      `/ratings/${selectionId}`
    )
    expect(statusCode).toBe(200)
    const properties = ['amount', 'average']
    properties.forEach((property) => {
      expect(body).toHaveProperty(property)
    })
  })

  test('should not delete rating if no auth', async () => {
    const { statusCode } = await request(app).delete(`/ratings/${selectionId}`)
    expect(statusCode).toBe(401)
  })

  test('should delete rating', async () => {
    const { statusCode } = await request(app)
      .delete(`/ratings/${selectionId}`)
      .set('Authorization', accessToken)
    expect(statusCode).toBe(204)
  })
})
