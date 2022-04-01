import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import authReducer, { authSaga } from './auth';
import articleReducer, { articleSaga } from './article';

const rootReducer = combineReducers({
  auth: authReducer,
  article: articleReducer,
});

export function* rootSaga() {
  yield all([authSaga(), articleSaga()]);
}

export default rootReducer;
