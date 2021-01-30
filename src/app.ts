import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import config from '../config';

const app = express();

// CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Construct MongoURI
const { MONGO_URI, MONGO_DB_NAME } = config;
const mongoUri = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to MongoDB
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB connected...`))
  .catch((err) => console.log(`MongoDB failed to connect..., ${err}`));

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

export default app;
