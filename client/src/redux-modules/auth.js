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

// 유저 로딩
const USER_LOADING_REQUEST = 'USER_LOADING_REQUEST';
const USER_LOADING_REQUEST_SUCCESS = 'USER_LOADING_REQUEST_SUCCESS';
const USER_LOADING_REQUEST_ERROR = 'USER_LOADING_REQUEST_ERROR';

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

// 유저 로딩
export const userLoad = () => ({
  type: USER_LOADING_REQUEST,
});

// 사가
// axios 설정
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
// 회원가입
const registerAPI = async (req) => {
  const res = await axios
    .post(`${configs.server.url}/auth/signup`, req, config)
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
const loginAPI = async (req) => {
  const res = await axios
    .post(`${configs.server.url}/auth/login`, req, config)
    .then((res) => res.data);

  return res;
};

function* loginUser(action) {
  try {
    const res = yield call(loginAPI, action.payload);

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

// 유저 로딩
/* 
  페이지 이동이나 새로고침할 때마다 헤더에 토큰을 담아서 요청하면 서버가 토큰이 유효한지 검증하고 DB에 유저가 있는지 확인 후 
  해당 유저의 토큰과 유저 아이디를 응답함 그것을 이용하거나 상태에 true값을 줘서 로그인 유지
*/
const LoadUserAPI = async () => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios
    .get(`${configs.server.url}/auth/me`, config)
    .then((res) => res.data);

  return res;
};

function* loadUser() {
  try {
    const res = yield call(LoadUserAPI);

    yield put({
      type: USER_LOADING_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: USER_LOADING_REQUEST_ERROR,
      payload: err.response,
    });
  }
}

export function* authSaga() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
  yield takeEvery(LOGIN_REQUEST, loginUser);
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
  yield takeEvery(USER_LOADING_REQUEST, loadUser);
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
    case USER_LOADING_REQUEST:
      return {
        ...state,
        errorMsg: null,
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
    case USER_LOADING_REQUEST_ERROR:
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
    case USER_LOADING_REQUEST_SUCCESS:
      return {
        ...state,
        isAuth: true,
        username: action.payload.username,
        nickname: action.payload.nickname,
        errorMsg: null,
      };
    default:
      return state;
  }
}
