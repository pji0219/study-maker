import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { configs } from '../config';

// 액션 타입
// 게시물 조회
const GET_ARTICLES_REQUEST = ' GET_ARTICLES_REQUEST';
const GET_ARTICLES_REQUEST_SUCCESS = ' GET_ARTICLES_REQUEST_SUCCESS';
const GET_ARTICLES_REQUEST_ERROR = ' GET_ARTICLES_REQUEST_ERROR';

// 하나의 게시물 조회
const GET_ARTICLE_REQUEST = ' GET_ARTICLE_REQUEST';
const GET_ARTICLE_REQUEST_SUCCESS = ' GET_ARTICLE_REQUEST_SUCCESS';
const GET_ARTICLE_REQUEST_ERROR = ' GET_ARTICLE_REQUEST_ERROR';

// 게시물 생성
const POST_ARTICLE_REQUEST = 'POST_ARTICLE_REQUEST';
const POST_ARTICLE_REQUEST_SUCCESS = 'POST_ARTICLE_REQUEST_SUCCESS';
const POST_ARTICLE_REQUEST_ERROR = 'POST_ARTICLE_REQUEST_ERROR';

// 게시물 수정
const PUT_ARTICLE_REQUEST = 'PUT_ARTICLE_REQUEST';
const PUT_ARTICLE_REQUEST_SUCCESS = 'PUT_ARTICLE_REQUEST_SUCCESS';
const PUT_ARTICLE_REQUEST_ERROR = 'PUT_ARTICLE_REQUEST_ERROR';

// 게시물 삭제
const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
const DELETE_ARTICLE_REQUEST_SUCCESS = 'DELETE_ARTICLE_REQUEST_SUCCESS';
const DELETE_ARTICLE_REQUEST_ERROR = 'DELETE_ARTICLE_REQUEST_ERROR';

// 액션 생성함수
// 게시물들 조회
export const loadArticles = () => ({
  type: GET_ARTICLES_REQUEST,
});

// 하나의 게시물 조회
export const loadArticle = (id) => ({
  type: GET_ARTICLE_REQUEST,
  payload: id,
});

// 생성
export const createArticle = (article) => ({
  type: POST_ARTICLE_REQUEST,
  payload: article,
});

// 수정
export const updateArticle = (article) => ({
  type: PUT_ARTICLE_REQUEST,
  payload: article,
  meta: article.id,
});

// 삭제
// meta는 리듀서에서 id를 알기 위한 용도
export const removeArticle = (id) => ({
  type: DELETE_ARTICLE_REQUEST,
  payload: id,
  meta: id,
});

// 사가
// axios 설정
const token = localStorage.getItem('token');

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

// 게시물들 조회
const getArticlesAPI = async () => {
  const res = await axios
    .get(`${configs.server.url}/article`, config)
    .then((res) => res.data);

  return res;
};

function* getArticles() {
  try {
    const res = yield call(getArticlesAPI);

    yield put({
      type: GET_ARTICLES_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: GET_ARTICLES_REQUEST_ERROR,
      payload: err.response.data.msg,
    });
  }
}

// 하나의 게시물 조회
const getArticleAPI = async (id) => {
  const res = await axios
    .get(`${configs.server.url}/article/${id}`, config)
    .then((res) => res.data);

  return res;
};

function* getArticle(action) {
  try {
    const res = yield call(getArticleAPI, action.payload);

    yield put({
      type: GET_ARTICLE_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: GET_ARTICLE_REQUEST_ERROR,
      payload: err.response.data.msg,
    });
  }
}

// 게시물 생성
const postArticleAPI = async (article) => {
  const res = await axios
    .post(`${configs.server.url}/article`, article, config)
    .then((res) => res.data);

  return res;
};

function* postArticle(action) {
  try {
    const res = yield call(postArticleAPI, action.payload);

    yield put({
      type: POST_ARTICLE_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      yield: POST_ARTICLE_REQUEST_ERROR,
      payload: err.response.data.msg,
    });
    yield put(alert('게시물 생성에 실패하였습니다.'));
  }
}

// 게시물 수정
const putArticleAPI = async (article) => {
  const res = await axios
    .put(`${configs.server.url}/article/${article.id}`, article, config)
    .then((res) => res.data);

  return res;
};

function* putArticle(action) {
  try {
    const res = yield call(putArticleAPI, action.payload);

    yield put({
      type: PUT_ARTICLE_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: PUT_ARTICLE_REQUEST_ERROR,
      payload: err.response.data.msg,
    });
    yield put(alert('게시물 수정에 실패하였습니다.'));
  }
}

// 게시물 삭제
const deleteArticleAPI = async (param) => {
  const res = await axios
    .delete(`${configs.server.url}/article/${param}`, config)
    .then((res) => res.data);

  return res;
};

function* deleteArticle(action) {
  const param = action.payload;
  const id = action.meta;

  try {
    const res = yield call(deleteArticleAPI, param);

    yield put({
      type: DELETE_ARTICLE_REQUEST_SUCCESS,
      payload: res,
      id,
    });
  } catch (err) {
    yield put({
      type: DELETE_ARTICLE_REQUEST_ERROR,
      payload: err.response.data.msg,
    });
    yield put(alert('게시물 삭제에 실패하였습니다.'));
  }
}

export function* articleSaga() {
  yield takeEvery(GET_ARTICLES_REQUEST, getArticles);
  yield takeEvery(GET_ARTICLE_REQUEST, getArticle);
  yield takeEvery(POST_ARTICLE_REQUEST, postArticle);
  yield takeEvery(PUT_ARTICLE_REQUEST, putArticle);
  yield takeEvery(DELETE_ARTICLE_REQUEST, deleteArticle);
}

// 리듀서
const initialState = {
  articles: [],
  article: {},
  errorMsg: null,
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES_REQUEST:
    case POST_ARTICLE_REQUEST:
    case PUT_ARTICLE_REQUEST:
    case DELETE_ARTICLE_REQUEST:
      return {
        ...state,
        errorMsg: null,
      };
    case GET_ARTICLES_REQUEST_SUCCESS:
      return {
        ...state,
        articles: [...action.payload],
        errorMsg: null,
      };
    case GET_ARTICLES_REQUEST_ERROR:
      return {
        ...state,
        articles: [],
        article: {},
        errorMsg: action.payload,
      };
    case GET_ARTICLE_REQUEST:
      return {
        ...state,
        article: {},
        errorMsg: null,
      };
    case GET_ARTICLE_REQUEST_SUCCESS:
      return {
        ...state,
        article: { ...action.payload },
        errorMsg: null,
      };
    case GET_ARTICLE_REQUEST_ERROR:
      return {
        ...state,
        article: {},
        errorMsg: action.payload,
      };
    case POST_ARTICLE_REQUEST_SUCCESS:
      return {
        ...state,
        articles: [action.payload, ...state.articles],
        errorMsg: null,
      };
    case POST_ARTICLE_REQUEST_ERROR:
    case PUT_ARTICLE_REQUEST_ERROR:
    case DELETE_ARTICLE_REQUEST_ERROR:
      return {
        ...state,
        errorMsg: action.payload,
      };
    case PUT_ARTICLE_REQUEST_SUCCESS:
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === action.payload._id ? action.payload : article
        ),
        errorMsg: null,
      };
    case DELETE_ARTICLE_REQUEST_SUCCESS:
      return {
        ...state,
        articles: state.articles.filter((article) => article._id !== action.id),
        errorMsg: null,
      };
    default:
      return state;
  }
}
