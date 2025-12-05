import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import aiRoutes from './Routes/aiRoutes.js';
import todo from './Routes/todo.js'

configDotenv();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbURI = process.env.MONGODB_URL;

mongoose.connect(dbURI).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.get('/', async(req, res) => {
  res.send("Hello World from Express!");
});

app.use('/api/ai/', aiRoutes);
app.use('/api', todo);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`); 
})