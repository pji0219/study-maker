import { call, put, takeEvery } from 'redux-saga';
import axios from 'axios';

import { configs } from '../config';

// 액션 타입
// 게시물 조회
const GET_ARTICLE_REQUEST = ' GET_ARTICLE_REQUEST';
const GET_ARTICLE_REQUEST_SUCCESS = ' GET_ARTICLE_REQUEST_SUCCESS';
const GET_ARTICLE_REQUEST_ERROR = ' GET_ARTICLE_REQUEST_SUCCESS';

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
// 조회
export const loadArticles = () => ({
  type: GET_ARTICLE_REQUEST,
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
});

// 삭제
export const removeArticle = (id) => ({
  type: DELETE_ARTICLE_REQUEST,
  payload: id,
});

// 사가
// axios 설정
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

// 게시물 조회
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
      type: GET_ARTICLE_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: GET_ARTICLE_REQUEST_ERROR,
      payload: err.response,
    });
  }
}

// 게시물 생성
const postArticleAPI = async (req) => {
  const res = axios
    .post(`${configs.server.url}/article`, req, config)
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
      payload: err.response,
    });
  }
}

// 게시물 수정
const putArticleAPI = (req) => {
  const res = axios
    .put(`${configs.server.url}/article/${req.id}`, req, config)
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
      payload: err.response,
    });
  }
}

// 게시물 삭제
const deleteArticleAPI = (id) => {
  const res = axios.delete(`${configs.server.url}/article/${id}`, config);
};

function deleteArticle() {}
