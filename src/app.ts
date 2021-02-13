import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { MONGO_URI } from './config/secrets';

// Routes
import shorturlRoute from './routes/shorturl';

const app = express();

// Express configuration
app.set('port', process.env.PORT || 5000);
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
app.use((req, res) => {
  res.status(404).sendFile(path.resolve('views/404.html'));
});

export default app;
