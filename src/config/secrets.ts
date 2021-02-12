import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const ENVIRONMENT = process.env.NODE_ENV;
const isProduction = ENVIRONMENT === 'production';

export const MONGO_URI = isProduction
  ? (process.env['MONGO_URI'] as string)
  : (process.env['MONGO_URI_LOCAL'] as string);

if (!MONGO_URI) {
  const env_var = isProduction ? 'MONGO_URI' : 'MONGO_URI_LOCAL';

  console.log(
    chalk.red(
      `[MongoDB] connection string missing - Set ${env_var} environment variable.`
    )
  );

  process.exit(1);
}
