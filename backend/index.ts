import express from 'express'
import { db } from './config/db'
import userRouter from './routes/user.routes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api/users', userRouter)

app.listen(4000, async () => {
    await db()
    console.log('puerto conectado')
})