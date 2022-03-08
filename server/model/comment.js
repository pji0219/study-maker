import mongoose from 'mongoose';
import moment from 'moment';
import Article, * as articleModel from './article.js';

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: moment().format('YY MM DD hh:mm:ss a'),
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export async function getAll(id) {
  // 게시글 id로 게시글을 찾은 뒤 그 게시글의 comments부분을 참조
  const comment = await Article.findById(id).populate({
    path: 'comments',
  });

  const result = comment.comments;
  return result;
}
