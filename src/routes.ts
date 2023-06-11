import express, { Router } from 'express'
import { UserController } from './controller/UserController'
import { OpenseaController } from './controller/OpenseaController'

const userController = new UserController()
const openseaController = new OpenseaController()

const router = Router()

router.get('/health_check', (req, res) => {
  res.send('OK!')
})

router.get('/users', userController.list)
router.post('/users', userController.create)
router.post('/users/auth', userController.authenticate)
router.post('/users/auth/refresh_token', userController.refreshAccessToken)
router.delete('/users/:id', userController.delete)

router.get('/nfts/collection/:slug', openseaController.listCollectionNfts)

export default router
