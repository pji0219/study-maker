import mongoose from 'mongoose';
import moment from 'moment';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: moment().format('YY-M-D h:m:s'),
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
