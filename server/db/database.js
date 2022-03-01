import Mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
  return Mongoose.connect(config.db.host, {}); // 6.x버전부터는 옵션을 따로 명시해주지 않아도 됨
}
