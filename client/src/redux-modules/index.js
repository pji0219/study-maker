import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import authReducer, { authSaga } from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
