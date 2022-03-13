import express from 'express';
import { isAuth } from '../middleware/auth.js';
import * as commentController from '../controller/comment.js';

const router = express.Router();

// GET /comment/:id <- id는 article id
router.get('/:id', isAuth, commentController.getAllComments);

// GET/comment?username=:username
router.get('/', isAuth, commentController.getCommentsByusername);

// POST /comment/:id <- id는 article id
router.post('/:id', isAuth, commentController.createComment);

// PUT /comment/:id <- id는 comment id
router.put('/:id', isAuth, commentController.updateComment);

// DELETE /comment/:id <- id는 comment id
router.delete('/:id', isAuth, commentController.deleteComment);

export default router;
