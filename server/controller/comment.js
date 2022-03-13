import * as commentModel from '../model/comment.js';

// 해당 게시글에 달린 모든 댓글 조회
export async function getAllComments(req, res) {
  const id = req.params.id;

  // 해당 게시글의 id로 게시글을 찾은 뒤 그 게시글에 달린 모든 댓글을 조회
  const comments = await commentModel.getAll(id);

  res.status(200).json(comments);
}

// 자기가 쓴 댓글들 조회
export async function getCommentsByusername(req, res) {
  const username = req.query.username;
  const comments = await commentModel.getByUsername(username);

  res.status(200).json(comments);
}

// 댓글 생성
export async function createComment(req, res) {
  const articleId = req.body.articleId;
  const text = req.body.text;

  const comment = await commentModel.create(req.userId, articleId, text);
  res.status(201).json(comment);
}

// 댓글 수정
export async function updateComment(req, res) {
  const id = req.params.id;
  const text = req.body.text;

  const comment = await commentModel.getById(id);

  if (!comment) {
    return res.sendStatus(404);
  }

  if ((comment.userId !== req, userId)) {
    return res.sendStatus(403);
  }

  const updated = await commentModel.update(id, text);
  res.status(200).json(updated);
}

// 댓글 삭제
export async function deleteComment(req, res) {
  const id = req.params.id;

  const comment = await commentModel.getById(id);

  if (!comment) {
    return res.sendStatus(404);
  }

  if (comment.userId !== req.userId) {
    return res.sendStatus(403);
  }

  await commentModel.remove(id);
  res.sendStatus(204);
}
