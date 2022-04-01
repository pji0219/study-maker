import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as userModel from '../model/user.js';
import { config } from '../config.js';

// 회원가입
export async function signup(req, res) {
  const { username, password, nickname } = req.body;

  const found = await userModel.findByUsername(username);
  if (found) {
    return res
      .status(409)
      .json({ msg: `${username}는 이미 가입된 id 입니다.` });
  }

  let userId;
  bcrypt.hash(
    password,
    parseInt(config.bcrypt.saltRounds),
    async function (err, hash) {
      if (err) {
        console.log('에러');
      }

      userId = await userModel.createUser({
        username,
        password: hash,
        nickname,
      });
    }
  );

  const token = createToken(userId);
  res.status(201).json({ token, username, nickname });
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

  const token = createToken(user._id);
  res.status(200).json({ token, username, nickname: user.nickname });
}

// 토큰 생성
function createToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expireInSec,
  });
}

// 클라이언트가 페이지 이동이나 새로고침할 때 요청하면 사용자 있는지 확인 후 로그인 유지
export async function me(req, res) {
  const user = await userModel.findById(req.userId);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  res.status(200).json({
    token: req.token,
    username: user.username,
    nickname: user.nickname,
  });
}
