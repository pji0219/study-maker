import mongoose from 'mongoose';

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
  comments: [
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
export default User;

export async function findByUsername(username) {
  return User.findOne({ username });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data._id);
}
