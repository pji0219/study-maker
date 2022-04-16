import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as articleController from '../controller/article.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateUpdateArticle = [
  body('text')
    .trim()
    .notEmpty()
    .withMessage('텍스트를 1글자 이상 입력해주세요.')
    .isLength({ min: 1 })
    .withMessage('텍스트를 1글자 이상 입력해주세요.'),
  validate,
];

const validateCreateArticle = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('제목을 1글자 이상 입력해주세요.')
    .isLength({ min: 1 })
    .withMessage('제목을 1글자 이상 입력해주세요.'),
  validate,
  ...validateUpdateArticle,
];

// GET /article
// GET /article?username=:username
router.get('/', articleController.getArticles);

// GET /article/:id
router.get('/:id', articleController.getArticleDetail);

// POST /article
router.post(
  '/',
  isAuth,
  validateCreateArticle,
  articleController.createArticle
);

// PUT /article/:id
router.put(
  '/:id',
  isAuth,
  validateUpdateArticle,
  articleController.updateArticle
);

// DELETE /article/:id
router.delete('/:id', isAuth, articleController.removeArticle);

export default router;
