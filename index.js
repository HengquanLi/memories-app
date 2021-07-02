import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello API')
})
// const CONNECTION_URL = 'mongodb+srv://memoryadmin:K7mJRz7R9p4HCSvA@cluster0.jvk8v.mongodb.net/memories?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)))
  .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);