import dotenv from 'dotenv';

dotenv.config();

const ENVIRONMENT = process.env.NODE_ENV;
const isProduction = ENVIRONMENT === 'production';

export const MONGO_URI = isProduction
  ? process.env['MONGODB_URI'] as string
  : process.env['MONGODB_URI_LOCAL'] as string;

if (!MONGO_URI) {
  if (isProduction) {
    console.log(
      '❌ No mongo connection string. Set MONGODB_URI environment variable.'
    );
  } else {
    console.log(
      '❌ No mongo connection string. Set MONGODB_URI_LOCAL environment variable.'
    );
  }

  process.exit(1);
}
