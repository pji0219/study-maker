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
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expireInSec: process.env.JWT_EXPIRES_SEC,
  },
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  },
};
