import { AppDataSource } from './data-source'
import cors from 'cors'
import router from './routes'
import { errorTreatment } from './middleware/error'
import express from 'express'

const main = async () => {
  await AppDataSource.initialize()
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(router)
  app.use(errorTreatment)

  const port = 4000
  app.listen(port, () => {
    console.log(`server running on port ${port}`)
  })
}

main().catch((err) => {
  console.error(err)
})
