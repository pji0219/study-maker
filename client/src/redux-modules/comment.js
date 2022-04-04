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
// 댓글들 조회
export const loadComments = () => ({
  type: GET_COMMENTS_REQUEST,
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
