import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';

const router = express.Router();

// 유효성 검사
const validateCredential = [
  body('username').trim().notEmpty().withMessage('아이디를 입력해주세요.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('비밀번호는 최소 5자 이상이어야 합니다.'),
  validate,
];

// POST /auth/signup
router.post('/signup', validateCredential, authController.signup);

// POST /auth/login
router.post('/login', validateCredential, authController.login);

export default router;
