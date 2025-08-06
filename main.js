import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { User } from './models/user/user.js'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit';


const app = express()
app.use(cors())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 20, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);
dotenv.config();
app.use(express.json())

await mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('mongoose cconnected')

  })
  .catch(() => {
    console.log('faild to connetc')
  })
const port = 3000
app.use(express.static('views'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
////
async function sendResponseEmail(user_email, quarry) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user_email,
      subject: 'Re: Hello from Raiplus!',
      html: `
    <p>Hi there,</p>
    <p>Thanks for reaching out.</p>
    <p>I've received your email and will get back to you as soon as possible.</p>
    <p><strong>Your query:</strong></p>
    <div style="padding: 10px; background-color: #f1f1f1; border-left: 3px solid #ccc;">
      ${quarry}
    </div>
    <p>Best regards,<br>[Raiplus]</p>
  `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:')

  } catch (error) {
    console.error('Error sending email:', error)
  }
}







///
app.post('/api/contact', async (req, res) => {
  let data = await req


  let user = new User({ Name: data.body.name, email: data.body.email, quarry: data.body.query })
  await user.save()
  sendResponseEmail(data.body.email, data.body.query)

  res.send({ message: 'Query raised' });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
