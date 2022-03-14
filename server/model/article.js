import mongoose from 'mongoose';
import moment from 'moment';
import User, * as userModel from './user.js';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: moment().format('YY MM DD h:mm:ss a'),
    },
    username: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);
export default Article;

export async function getAll() {
  // 제일 마지막에 작성된거부터 순서대로 정렬해서 게시글 전부 찾아옴(최신 순으로)
  return Article.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Article.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Article.findById(id);
}

export async function create(title, text, userId) {
  // userId로 User컬렉션에서 name과 username을 받아온 다음 게시글을 만들때 같이 넣어줌
  const newArticle = await userModel.findById(userId).then((user) =>
    new Article({
      title,
      text,
      userId,
      username: user.username,
      nickname: user.nickname,
      date: moment().format('YY MM DD hh:mm:ss a'),
    }).save()
  );

  // User 컬렉션에서 userId로 작성자를 찾은 뒤 작성한 게시글을 연결(해당 작성자가 쓴 게시글들을 구분 하기 위해)
  await User.findByIdAndUpdate(userId, {
    $push: {
      article: newArticle._id,
    },
  });

  return newArticle;
}

export async function update(id, text) {
  // 수정 후 업데이트 된 데이터로 받아오고 싶으면 returnOriginal: false로 설정 해줘야 함
  return Article.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function remove(id) {
  return Article.findByIdAndDelete(id);
}
