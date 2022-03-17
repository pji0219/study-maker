import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import userReducer, { usersSaga } from './auth';

const rootReducer = combineReducers({
  user: userReducer,
});

export function* rootSaga() {
  yield all([usersSaga()]);
}

// export function* rootSaga() {
//   yield all([fork(usersSaga)]);
// }

export default rootReducer;
