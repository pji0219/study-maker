import express from 'express';
import * as articleController from '../controller/article.js';
import { isAuth } from '../middleware/auth.js';
import * as commentModel from '../controller/comment.js';

const router = express.Router();

// article
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

// comment
// GET /article/:id/comment
router.get('/:id/comment', isAuth, commentModel.getAllComments);

export default router;
