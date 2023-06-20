import { AppDataSource } from './data-source'
import app from './app'

const main = async () => {
  await AppDataSource.initialize()
  const port = 4000
  app.listen(port, () => {
    console.log(`server running on port ${port}`)
  })
}

main().catch((err) => {
  console.error(err)
})
