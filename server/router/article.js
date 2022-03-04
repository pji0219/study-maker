import express from 'express';
import * as articleController from '../controller/article.js';

const router = express.Router();

// GET /article
// GET /article?username=:username
router.get('/', articleController.getArticles);

// GET /article/:id
router.get('/:id', articleController.getArticleDetail);

// POST /article
router.post('/', articleController.createArticle);

// PUT /article/:id
router.put('/:id', articleController.updateArticle);

//

export default router;
