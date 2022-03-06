import jwt from 'jsonwebtoken';
import * as userModel from '../model/user.js';
import { config } from '../config.js';

const AUTH_ERROR = { msg: '인증 에러' };

export function isAuth(req, res, next) {
  // request 헤더의 Authorization키 안의 밸류를 할당
  const authHeader = req.get('Authorization');

  // authHeader가 존재하지 않고 authHeader가 Bearer로 시작 하지 않으면 에러 메세지 전달
  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    return res.status(401).json(AUTH_ERROR);
  }

  // Bearer 다음의 token을 읽어 와야 하기 때문에 스페이스로 분리 해준 다음에 Bearer 다음에 있는 토큰을 할당
  const token = authHeader.split(' ')[1];

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }

    // jwt에서 토큰이 검증 되었어도 실제로 사용자가 DB에 있는지 확인
    const user = await userModel.findById(decoded.id);

    // 사용자가 존재하지 않으면 에러 전달
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }

    // DB에 사용자가 있으면 사용자의 아이디를 req에 userId로 추가
    req.userId = user.id;

    req.token = token;

    next();
  });
}
