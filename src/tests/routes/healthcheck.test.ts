import request from 'supertest'
import app from '../../app'
import { AppDataSource } from '../../data-source'

describe('healthcheck', () => {
  test('It should return OK!', async () => {
    await AppDataSource.initialize()
    const response = await request(app).get('/health_check')
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('OK!')
  })
})
