import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, MONGO_URI_DEV, MONGO_URI_PROD, MONGO_URI_TEST } = process.env;

export const MONGO_URI = (NODE_ENV === 'production'
  ? MONGO_URI_PROD
  : NODE_ENV === 'development'
  ? MONGO_URI_DEV
  : MONGO_URI_TEST) as string;

if (!MONGO_URI) {
  console.log(
    chalk.red(`[MongoDB] Missing connection string for MongoDB in ${NODE_ENV}`)
  );

  process.exit(1);
}
