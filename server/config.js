import dotenv from 'dotenv';
dotenv.config();

export const config = {
  host: {
    port: process.env.HOST_PORT,
  },
  cors: {
    allowOrign: process.env.CORS_ALLOW_ORIGN,
  },
  db: {
    host: process.env.DB_HOST,
  },
};
