import * as commentModel from '../model/comment.js';

// 해당 게시글에 달린 모든 댓글 조회
export async function getAllComments(req, res) {
  const id = req.params.id;

  // 해당 게시글의 id로 게시글을 찾은 뒤 그 게시글에 달린 모든 댓글을 조회
  const comments = await commentModel.getAll(id);

  res.status(200).json(comments);
}
