import express from 'express'
import { db } from './config/db'
import userRouter from './routes/user.routes'
import proyectRouter from './routes/proyect.routes';
import tasksRoutes from './routes/task.routes'
import cors from 'cors'
import dotenv  from 'dotenv'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use(cors(
    {
        origin : process.env.FRONTEND_URL!,
        credentials : true
    }
))
app.use('/api/users', userRouter)
app.use('/api/proyects', proyectRouter);
app.use('/api/tasks', tasksRoutes);

app.listen(4000, async () => {
    await db()
    console.log('puerto conectado')
})