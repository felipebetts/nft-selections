import cors from 'cors'
import router from './routes'
import { errorTreatment } from './middleware/error'
import express from 'express'

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorTreatment)

export default app
