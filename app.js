import express from 'express';
const app = express();
import { router as tasks } from './routes/tasks.js';
import { connectDB } from './db/connect.js';
import detenv from 'dotenv';
detenv.config();
import notFound from './middleware/not-found.js';

app.use(express.static('./public'));
app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks);
app.use(notFound);

const PORT = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
