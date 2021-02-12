declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'test';
      MONGO_URI_PROD: string;
      MONGO_URI_DEV: string;
      MONGO_URI_TEST: string;
      PORT?: 'string';
    }
  }
}

export {}