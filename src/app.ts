import express from 'express'
import { router } from './routes'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'https://materdeicam.org.br/'
}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://materdeicam.org.br/');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use(express.json())
app.use(router)

export { app }