import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { isAuth } from '../middleware/auth.js';
import * as commentController from '../controller/comment.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// 유효성 검사
const validateComment = [
  body('text')
    .trim()
    .notEmpty()
    .withMessage('1글자 이상을 입력하세요.')
    .isLength({ min: 1 })
    .withMessage('1글자 이상을 입력하세요.'),
  validate,
];

// GET /comment/:id <- id는 article id
router.get('/:id', commentController.getAllComments);

// GET/comment?username=:username
router.get('/', isAuth, commentController.getCommentsByusername);

// POST /comment/:id <- id는 article id
router.post('/:id', isAuth, validateComment, commentController.createComment);

// PUT /comment/:id <- id는 comment id
router.put('/:id', isAuth, validateComment, commentController.updateComment);

// DELETE /comment/:id <- id는 comment id
router.delete('/:id', isAuth, commentController.deleteComment);

export default router;
