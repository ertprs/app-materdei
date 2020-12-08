import express from 'express'
import { router } from './routes'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'https://materdeicam.org.br',
    methods: 'POST',
    optionsSuccessStatus: 201
}))
app.use(express.json())
app.use(router)

export { app }