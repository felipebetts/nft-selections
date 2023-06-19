import { AppDataSource } from '../../data-source'
import request from 'supertest'
import app from '../../app'

describe('rating routes', () => {
  let userId: number
  let accessToken: string
  let selectionId: number
  let ratingId: number
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
    const { body, statusCode } = await request(app)
      .post(`/ratings/${selectionId}`)
      .send({
        value: 4,
      })
      .set('Authorization', accessToken)
    expect(statusCode).toBe(200)
    console.log('rating body:', body)
  })

  // test('should not update rating if no auth', async () => {
  //   const { statusCode } = await request(app).put(`/ratings/`)
  // })

  // test('should update rating', async () => {})

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
