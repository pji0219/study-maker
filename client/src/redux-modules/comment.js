import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { configs } from '../config';

// 타입
// 댓글들 조회
const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
const GET_COMMENTS_REQUEST_SUCCESS = 'GET_COMMENTS_REQUEST_SUCCESS';
const GET_COMMENTS_REQUEST_ERROR = 'GET_COMMENTS_REQUEST_ERROR';

// 해당 유저의 댓글들 조회
const GET_COMMENTS_BY_USER_REQUEST = 'GET_COMMENTS_BY_USER_REQUEST';
const GET_COMMENTS_BY_USER_REQUEST_SUCCESS = 'GET_COMMENTS_BY_USER_SUCCESS';
const GET_COMMENTS_BY_USER_REQUEST_ERROR = 'GET_COMMENTS_BY_USER_REQUEST_ERROR';

// 댓글 생성
const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST ';
const POST_COMMENT_REQUEST_SUCCESS = 'POST_COMMENT_REQUEST_SUCCESS ';
const POST_COMMENT_REQUEST_ERROR = 'POST_COMMENT_REQUEST_ERROR ';

// 댓글 수정
const PUT_COMMENT_REQUEST = 'PUT_COMMENT_REQUEST ';
const PUT_COMMENT_REQUEST_SUCCESS = 'PUT_COMMENT_REQUEST_SUCCESS ';
const PUT_COMMENT_REQUEST_ERROR = 'PUT_COMMENT_REQUEST_ERROR ';

// 댓글 삭제
const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST ';
const DELETE_COMMENT_REQUEST_SUCCESS = 'DELETE_COMMENT_REQUEST_SUCCESS ';
const DELETE_COMMENT_REQUEST_ERROR = 'DELETE_COMMENT_REQUEST_ERROR ';

// 액션 생성 함수
// 해당 게시물의 댓글들 조회
export const loadComments = (articleId) => ({
  type: GET_COMMENTS_REQUEST,
  payload: articleId,
});

// 해당 유저의 댓글들 조회
export const loadCommentsByUser = (username) => ({
  type: GET_COMMENTS_BY_USER_REQUEST,
  payload: username,
});

// 댓글 생성
export const createComment = (comment) => ({
  type: POST_COMMENT_REQUEST,
  payload: comment,
});

// 댓글 수정
export const updateComment = (comment) => ({
  type: PUT_COMMENT_REQUEST,
  payload: comment,
});

// 댓글 삭제
export const removeComment = (id) => ({
  type: DELETE_COMMENT_REQUEST,
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

// 해당 게시물의 댓글들 조회
const getCommentsAPI = async (articleId) => {
  const res = await axios
    .get(`${configs.server.url}/comment/${articleId}`, config)
    .then((res) => res.data);

  return res;
};

function* getComments(action) {
  try {
    const res = yield call(getCommentsAPI, action.payload);

    yield put({
      type: GET_COMMENTS_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: GET_COMMENTS_REQUEST_ERROR,
      payload: err.response.data.msg,
    });
  }
}

// 해당 유저의 댓글들 조회
const getCommentsByusernameAPI = async (username) => {
  const res = await axios
    .get(`${configs.server.url}/comment/?username=${username}`, config)
    .then((res) => res.data);

  return res;
};

function* getCommentsByusername(action) {
  try {
    const res = yield call(getCommentsByusernameAPI, action.payload);

    yield put({
      type: GET_COMMENTS_BY_USER_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: GET_COMMENTS_BY_USER_REQUEST_ERROR,
      payload: err.response.data.msg,
    });
  }
}

// 댓글 생성
// id는 게시글 id
const postCommentAPI = async (comment) => {
  const res = await axios
    .post(`${configs.server.url}/comment/${comment.id}`, comment, config)
    .then((res) => res.data);

  return res;
};

function* postComment(action) {
  try {
    const res = yield call(postCommentAPI, action.payload);

    yield put({
      type: POST_COMMENT_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: POST_COMMENT_REQUEST_ERROR,
      payload: err.response.data.msg,
    });

    yield alert('댓글 작성에 실패 하였습니다.');
  }
}

// 댓글 수정
// id는 댓글 id
const putCommentAPI = async (comment) => {
  const res = await axios
    .put(`${configs.server.url}/comment/${comment.id}`, comment, config)
    .then((res) => res.data);

  return res;
};

function* putComment(action) {
  try {
    const res = yield call(putCommentAPI, action.payload);

    yield put({
      type: PUT_COMMENT_REQUEST_SUCCESS,
      payload: res,
    });
  } catch (err) {
    yield put({
      type: PUT_COMMENT_REQUEST_ERROR,
      payload: err.response.data.msg,
    });

    yield alert('댓글 수정에 실패하였습니다.');
  }
}

// 댓글 삭제
const deleteCommentAPI = async (param) => {
  const res = await axios
    .delete(`${configs.server.url}/comment/${param}`, config)
    .then((res) => res.data);

  return res;
};

function* deleteComment(action) {
  const param = action.payload;
  const id = action.meta;

  try {
    const res = yield call(deleteCommentAPI, param);

    yield put({
      type: DELETE_COMMENT_REQUEST_SUCCESS,
      payload: res,
      id,
    });
  } catch (err) {
    yield put({
      type: DELETE_COMMENT_REQUEST_ERROR,
      payload: err.response.data.msg,
    });

    yield alert('댓글 삭제에 실패하였습니다.');
  }
}

export function* commentSaga() {
  yield takeEvery(GET_COMMENTS_REQUEST, getComments);
  yield takeEvery(GET_COMMENTS_BY_USER_REQUEST, getCommentsByusername);
  yield takeEvery(POST_COMMENT_REQUEST, postComment);
  yield takeEvery(PUT_COMMENT_REQUEST, putComment);
  yield takeEvery(DELETE_COMMENT_REQUEST, deleteComment);
}

const initialState = {
  comments: [],
  errMsg: null,
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
    case GET_COMMENTS_BY_USER_REQUEST:
    case POST_COMMENT_REQUEST:
    case PUT_COMMENT_REQUEST:
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        errMsg: null,
      };
    case GET_COMMENTS_REQUEST_SUCCESS:
    case GET_COMMENTS_BY_USER_REQUEST_SUCCESS:
      return {
        ...state,
        comments: [...action.payload],
      };
    case GET_COMMENTS_REQUEST_ERROR:
    case GET_COMMENTS_BY_USER_REQUEST_ERROR:
      return {
        ...state,
        comments: [],
        errMsg: action.payload,
      };
    case POST_COMMENT_REQUEST_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        errMsg: null,
      };
    case PUT_COMMENT_REQUEST_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
        errMsg: null,
      };
    case DELETE_COMMENT_REQUEST_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== action.id),
        errMsg: null,
      };
    default:
      return state;
  }
}
