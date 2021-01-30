import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
};

export default config;
