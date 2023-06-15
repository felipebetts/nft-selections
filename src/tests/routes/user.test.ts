import request from 'supertest'
import app from '../../app'
import { AppDataSource } from '../../data-source'

describe('user routes', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  let userId: number
  let refreshToken: string

  test('should create user', async () => {
    const userData = {
      name: 'thor',
      email: 'thor@avengers.com',
      password: '1234',
    }
    const response = await request(app).post('/users').send(userData)
    userId = response.body.id
    expect(response.statusCode).toBe(200)
  })

  test('should list users', async () => {
    const { body, statusCode } = await request(app).get('/users')
    expect(statusCode).toBe(200)
  })

  test('should login', async () => {
    const { statusCode, body } = await request(app).post('/users/auth').send({
      email: 'thor@avengers.com',
      password: '1234',
    })
    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('accessToken')
    expect(body).toHaveProperty('refreshToken')
    refreshToken = body.refreshToken
  })

  test('should refresh tokens', async () => {
    const { statusCode, body } = await request(app)
      .post(`/users/auth/refresh_token`)
      .send({ refresh_token: refreshToken })
    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('accessToken')
    expect(body).toHaveProperty('refreshToken')
  })

  test('should delete user', async () => {
    const response = await request(app).delete(`/users/${userId}`)
    expect(response.statusCode).toBe(200)
  })
})
