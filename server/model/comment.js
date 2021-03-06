import mongoose from 'mongoose';
import moment from 'moment';
import Article from './article.js';
import User, * as userModel from './user.js';

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
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
  nickname: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export async function getAll(id) {
  // 게시글 id로 게시글을 찾은 뒤 그 게시글의 comments부분의 내용을 참조(나오게 함)
  const comment = await Article.findById(id).populate({
    path: 'comments',
  });

  const result = comment.comments;
  return result;
}

export async function getByUsername(username) {
  return await Comment.find({ username });
}

export async function getById(id) {
  return await Comment.findById(id);
}

export async function create(userId, articleId, text) {
  const newComment = await userModel.findById(userId).then((user) =>
    new Comment({
      text,
      userId,
      article: articleId,
      username: user.username,
      nickname: user.nickname,
      date: moment().format('YY MM DD hh:mm:ss a'),
    }).save()
  );

  await Article.findByIdAndUpdate(articleId, {
    $push: {
      comments: newComment._id,
    },
  });

  await User.findByIdAndUpdate(userId, {
    $push: {
      comments: {
        articleId,
        commentId: newComment._id,
      },
    },
  });

  return newComment;
}

export async function update(id, text) {
  return await Comment.findByIdAndUpdate(
    id,
    { text },
    { returnOriginal: false }
  );
}

export async function remove(id) {
  return await Comment.findByIdAndDelete(id);
}
