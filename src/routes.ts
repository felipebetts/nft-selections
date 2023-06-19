import { Router } from 'express'
import { UserController } from './controller/UserController'
import { OpenseaController } from './controller/OpenseaController'
import { SelectionController } from './controller/SelectionController'
import { authProtection } from './middleware/auth'
import { NftController } from './controller/NftController'
import 'express-async-errors'
import { RatingController } from './controller/RatingController'

const userController = new UserController()
const openseaController = new OpenseaController()
const selectionController = new SelectionController()
const nftController = new NftController()
const ratingController = new RatingController()

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
router.get(
  '/selections/paginate/:selectionId',
  selectionController.paginateSelectionNfts
)
router.post('/selections', authProtection, selectionController.createSelection)
router.post(
  '/selections/:selectionId/select-nft/:nftId',
  authProtection,
  selectionController.selectNft
)
router.delete(
  '/selections/:selectionId/remove-nft/:nftId',
  authProtection,
  selectionController.deleteNftFromSelection
)
router.delete('/selections/:id', authProtection, selectionController.delete)

router.post('/ratings/:selectionId', authProtection, ratingController.create)
router.delete('/ratings/:selectionId', authProtection, ratingController.delete)
router.put('/ratings/:ratingId', authProtection, ratingController.update)

export default router
