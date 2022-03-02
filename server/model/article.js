import mongoose from 'mongoose';
import moment from 'moment';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: -2,
  },
  date: {
    type: String,
    default: moment().format('YY-M-D h:m:s'),
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  commnet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
});

const Article = mongoose.model('Article', articleSchema);
