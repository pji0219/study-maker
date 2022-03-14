import express from 'express';
import { body } from 'express-validator';
import 'express-async-errors';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';

const router = express.Router();

// 유효성 검사
const validateLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('아이디를 입력해주세요.')
    .isLength({ min: 3 })
    .withMessage('아이디는 최소 3글자 이상이어야 합니다.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('비밀번호는 최소 5자 이상이어야 합니다.'),
  validate,
];

const validateSignup = [
  ...validateLogin,
  body('nickname')
    .trim()
    .notEmpty()
    .withMessage('닉네임을 입력하세요.')
    .isLength({ min: 3 })
    .withMessage('닉네임은 3글자 이상이어야 합니다.'),
  validate,
];

// POST /auth/signup
router.post('/signup', validateSignup, authController.signup);

// POST /auth/login
router.post('/login', validateLogin, authController.login);

export default router;
