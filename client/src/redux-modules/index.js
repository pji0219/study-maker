import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import authReducer, { authSaga } from './auth';
import articleReducer, { articleSaga } from './article';
import commentReducer, { commentSaga } from './comment';

const rootReducer = combineReducers({
  auth: authReducer,
  article: articleReducer,
  comment: commentReducer,
});

export function* rootSaga() {
  yield all([authSaga(), articleSaga(), commentSaga()]);
}

export default rootReducer;
