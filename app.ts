import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'

import type { Express } from 'express'
import type { Server } from 'http'

import { job } from './cron'

dotenv.config()

const port = 3000

const app:Express = express()
const server: Server = http.createServer(app)

console.log('====================================================================')
const a = process.env.APP_ID
console.log('process.env.APP_ID', JSON.stringify(a))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

job.start()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Express server is listening at ${port}`)
})
