import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { User } from './models/user/user.js'
import dotenv from 'dotenv'


const app = express()
app.use(cors())
dotenv.config();
app.use(express.json())
await mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log('mongoose cconnected') })
  .catch(() => {
    console.log('faild to connetc')
  })
const port = 3000
app.use(express.static('views'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/api/contact', async (req, res) => {
  let data = await req


  let user = new User({ Name: data.body.name, email: data.body.email, quarry: data.body.query })
  await user.save()

  res.send({ message: 'Query raised' });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
