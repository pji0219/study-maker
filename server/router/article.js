import express from 'express';
import * as articleController from '../controller/article.js';

const router = express.Router();
// TODO: 인증 미들웨어 만들어서 연결 해야됨
// GET /article
// GET /article?username=:username
router.get('/', articleController.getArticles);

// GET /article/:id
router.get('/:id', articleController.getArticleDetail);

// POST /article
router.post('/', articleController.createArticle);

// PUT /article/:id
router.put('/:id', articleController.updateArticle);

// DELETE /article/:id
router.delete('/:id', articleController.removeArticle);

export default router;
