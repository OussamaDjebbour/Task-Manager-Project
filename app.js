import express from 'express'
const app = express()
import {router as tasks} from './routes/tasks.js'
import { connectDB } from './db/connect.js' 
import detenv from 'dotenv'
detenv.config()

app.use(express.json())




// routes

app.get('/hello',(req,res)=> { 
    res.send('Task Manager App')
})

app.use('/api/v1/tasks',tasks)

const PORT = 3000



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`server is listening on port ${PORT}...`));
        
    } catch (error) {
        console.log(error)
    }
}

start()