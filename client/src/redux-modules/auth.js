import { call, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { configs } from '../config';

// 타입
// 회원가입
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
const REGISTER_REQUEST_ERROR = 'REGISTER_REQUEST_ERROR';

// 로그인
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
const LOGIN_REQUEST_ERROR = 'LOGIN_REQUEST_ERROR';

// 로그아웃
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';

// 액션 생성함수
// 회원가입
export const signupUser = (user) => ({
  type: REGISTER_REQUEST,
  payload: user,
});

// 로그인
export const login = (user) => ({
  type: LOGIN_REQUEST,
  payload: user,
});

// 로그아웃
export const logout = () => ({
  type: LOGOUT_REQUEST,
});

// 사가
// axios 설정
const config = {
  Headers: {
    'Content-Type': 'application/json',
  },
};
// 회원가입
const registerAPI = (req) => {
  const res = axios
    .post(`${configs.server.url}/auth/signup`, req, config) //
    .then((res) => res.data);

  return res;
};

function* registerUser(action) {
  try {
    const res = yield call(registerAPI, action.payload);
    yield put({
      type: REGISTER_REQUEST_SUCCESS,
      payload: res,
    });
    yield put(alert('회원가입이 완료 되었습니다.'));
  } catch (err) {
    yield put({
      type: REGISTER_REQUEST_ERROR,
      payload: err.response,
    });
  }
}

// 로그인
const loginAPI = (req) => {
  const res = axios
    .post(`${configs.server.url}/auth/login`, req, config) //
    .then((res) => res.data);

  return res;
};

function* loginUser(action) {
  const res = yield call(loginAPI, action.payload);

  try {
    yield put({
      type: LOGIN_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: LOGIN_REQUEST_ERROR,
      payload: err.response,
    });

    yield put(alert('로그인에 실패하였습니다.'));
  }
}

// 로그아웃
function* logoutUser() {
  yield put({
    type: LOGOUT_REQUEST_SUCCESS,
  });
}

export function* authSaga() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
  yield takeEvery(LOGIN_REQUEST, loginUser);
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

// 리듀서
const initialState = {
  isAuth: false,
  errorMsg: null,
  username: null,
  nickname: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case REGISTER_REQUEST_SUCCESS:
    case LOGIN_REQUEST_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuth: true,
        username: action.payload.username,
        nickname: action.payload.nickname,
        errorMsg: null,
      };
    case REGISTER_REQUEST_ERROR:
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        errorMsg: action.payload.data.msg,
      };
    case LOGOUT_REQUEST_SUCCESS:
      localStorage.clear('token');
      return {
        ...state,
        isAuth: false,
        username: null,
        nickname: null,
        errorMsg: null,
      };
    default:
      return state;
  }
}
