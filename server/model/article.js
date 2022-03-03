import mongoose from 'mongoose';
import moment from 'moment';

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
      default: moment().format('YY MM DD h:mm:ss'),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    commnet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

// 사용 안 할수도 있어서 일단 여기에 둠
// views: {
//   type: Number,
//   글을 작성할 때 처음 작성한 사람도 조회수에 포함 되서 그것을 빼주기 위해서 -2
//   default: -2,
// },

// username: {
//   type: String,
//   required: true,
// },

const Article = mongoose.model('Article', articleSchema);

export async function getAll() {
  // 제일 마지막에 작성된거부터 순서대로 정렬해서 게시글 전부 찾아옴(최신 순으로)
  return Article.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Article.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  Article.findById(id);
}

// 추후에 userId를 파라미터로 받아오는 식으로 구현 해야될수도 있음
export async function create(text, title) {
  return Article.create({
    text,
    title,
  });
}

export async function update(id, text) {
  // 수정 후 업데이트 된 데이터로 받아오고 싶으면 returnOriginal: false로 설정 해줘야 함
  return Article.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function remove(id) {
  return Article.findByIdAndDelete(id);
}
