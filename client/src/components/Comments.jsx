import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import Comment from './Comment';
import { loadComments } from '../redux-modules/comment';

const Base = styled.ul`
  margin: 0 auto;
  width: 1200px;
  height: 100%;
  background-color: #fff;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;

function Comments({ articleId }) {
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadComments(articleId));
  }, [dispatch, articleId]);

  return (
    <Base>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          commentId={comment._id}
          text={comment.text}
          date={comment.date}
          username={comment.username}
          nickname={comment.nickname}
        />
      ))}
    </Base>
  );
}

export default Comments;
