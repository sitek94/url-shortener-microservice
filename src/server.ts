import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

// Middlewares
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
