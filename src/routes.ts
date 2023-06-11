import express, { Router } from 'express'

const router = Router()

router.get('/health_check', (req, res) => {
  res.send('OK!')
})

export default router
