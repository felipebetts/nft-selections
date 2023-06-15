import { Router } from 'express'
import { UserController } from './controller/UserController'
import { OpenseaController } from './controller/OpenseaController'
import { SelectionController } from './controller/SelectionController'
import { authProtection } from './middleware/auth'
import { NftController } from './controller/NftController'
import 'express-async-errors'

const userController = new UserController()
const openseaController = new OpenseaController()
const selectionController = new SelectionController()
const nftController = new NftController()

const router = Router()

router.get('/health_check', (req, res) => {
  res.send('OK!')
})

router.get('/users', userController.list)
router.post('/users', userController.create)
router.post('/users/auth', userController.authenticate)
router.post('/users/auth/refresh_token', userController.refreshAccessToken)
router.delete('/users/:id', userController.delete)

router.get('/nfts', nftController.listNfts)
router.get('/nfts/collection/:slug', openseaController.listCollectionNfts)
router.post('/nfts', authProtection, nftController.createNft)
router.delete('/nfts/:id', authProtection, nftController.deleteNft)

router.get('/selections/:selectionId', selectionController.listSelectionNfts)
router.post('/selections', authProtection, selectionController.createSelection)
router.post(
  '/selections/:selectionId/select-nft',
  authProtection,
  selectionController.selectNft
)
router.delete(
  '/selections/:selectionId/remove-nft/:nftId',
  authProtection,
  selectionController.deleteNftFromSelection
)
router.delete('/selections/:id', authProtection, selectionController.delete)

export default router
