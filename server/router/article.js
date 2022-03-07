import express from 'express';
import * as articleController from '../controller/article.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /article
// GET /article?username=:username
router.get('/', isAuth, articleController.getArticles);

// GET /article/:id
router.get('/:id', isAuth, articleController.getArticleDetail);

// POST /article
router.post('/', isAuth, articleController.createArticle);

// PUT /article/:id
router.put('/:id', isAuth, articleController.updateArticle);

// DELETE /article/:id
router.delete('/:id', isAuth, articleController.removeArticle);

export default router;
