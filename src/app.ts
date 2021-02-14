import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './config';
import { errorHandler } from './middleware/error-handler';

// Routes
import shorturlRoute from './routes/shorturl';

const app = express();

// Express configuration
app.set('port', PORT || 5000);
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`✅ MongoDB connected...`))
  .catch((err) => console.log(`❌ MongoDB failed to connect, ${err.message}`));

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

// Api routes
app.use('/api/shorturl', shorturlRoute);

// 404: Not Found
app.all('*', (req, res) => {
  res.status(404).sendFile(path.resolve('views/404.html'));
});

app.use(errorHandler);

export default app;
