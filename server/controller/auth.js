import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as userModel from '../model/user.js';
import { config } from '../config';

// 회원가입
export async function signup(req, res) {
  const { username, password } = req.body;

  const found = await userModel.findByUsername(username);
  if (found) {
    return res.status(409).json({ msg: `${username} 이미 가입된 id 입니다.` });
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userModel.createUser({
    username,
    password: hashed,
  });

  const token = createToken(userId);
  res.status(201).json({ token, username });
}

// 로그인
export async function login(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findByUsername(username);
  if (!user) {
    return res
      .status(401)
      .json({ msg: '유효하지 않은 아이디 또는 비밀번호 입니다.' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ msg: '유효하지 않은 아이디 또는 비밀번호 입니다.' });
  }

  const token = createToken(user.id);
  res.status(200).json({ token, username });
}

// 토큰 생성
function createToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expireInSec,
  });
}