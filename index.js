
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; //Cross-origin resource sharing
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv'; //load environment variables from .env file

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));//limit: control the maximum request body size;
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING');
})



const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)))
  .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);