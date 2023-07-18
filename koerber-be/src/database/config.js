import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'postgres',
  PASSWORD: process.env.DB_PASSWORD || 'admin',
  DB_NAME: process.env.DB_NAME || 'koerber',
  dialect: 'postgres'
};

export default config;
