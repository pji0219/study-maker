import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../redux-modules/comment';

const TextArea = styled.textarea`
  width: 1154px;
  height: 100px;
  margin: 5px 20px 5px;
  background-color: #fff;
  border: 1.8px solid #bdbdbd;
  border-radius: 8px;
  resize: none;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const CommentCount = styled.p`
  margin-top: 20px;
  margin-left: 20px;
  font-size: 16px;
  font-weight: 550;
`;

const BtnContainer = styled.div`
  width: 1160px;
  margin: 0 20px 20px;
  display: flex;
  justify-content: flex-end;
`;

const SummitBtn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 30px;
  background-color: #6666ff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

function NewCommentForm({ articleId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const [text, setText] = useState('');

  const onChange = (event) => {
    const value = event.target.value;
    setText(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      id: articleId,
      text,
    };
    dispatch(createComment(newComment));
  };

  return (
    <>
      <CommentCount>{comments.length}개의 댓글이 달렸습니다.</CommentCount>
      <form onSubmit={onSubmit}>
        <TextArea
          placeholder="댓글을 입력하세요."
          value={text}
          onChange={onChange}
        />
        <BtnContainer>
          <SummitBtn type="submit">제출</SummitBtn>
        </BtnContainer>
      </form>
    </>
  );
}

export default NewCommentForm;
