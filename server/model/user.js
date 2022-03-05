import mongoose from 'mongoose';
import moment from 'moment';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  article: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    },
  ],
  comment: [
    {
      articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      },
      commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

export async function findByUsername(username) {
  return User.findOne({ username });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}
