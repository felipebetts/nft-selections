import { AppDataSource } from './data-source'
import { User } from './entity/User'
import express from 'express'
import cors from 'cors'
import router from './routes'

const main = async () => {
  await AppDataSource.initialize()
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(router)

  const port = 4000
  app.listen(port, () => {
    console.log(`server running on port ${port}`)
  })
}

main().catch((err) => {
  console.error(err)
})
