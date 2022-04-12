import React, { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

const Base = styled.li`
  width: 1200px;
  height: auto;
  color: #222;
  font-size: 17px;

  &:not(:first-of-type) {
    margin-top: 10px;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #6666ff;
  }
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Nickname = styled.span`
  margin-top: 10px;
  margin-left: 20px;
`;

const Date = styled.span`
  margin-top: 10px;
  margin-right: 20px;
`;

const Content = styled.textarea`
  width: 1100px;
  height: auto;
  margin-top: 10px;
  margin-left: 20px;
  resize: none;
  background-color: #fff;
  border: none;
  font-size: 15px;
`;

function Comment({ commentId, text, date, username, nickname }) {
  const dispatch = useDispatch();
  const textRef = useRef();

  // 댓글 텍스트를 불러올 시에 댓글창 높이 자동 조절
  const autoSize = useCallback(() => {
    const obj = textRef.current;
    obj.style.height = 'auto';
    obj.style.height = obj.scrollHeight + 'px';
  }, []);

  useEffect(() => {
    autoSize();
  }, [text, autoSize]);

  return (
    <Base>
      <Info>
        <Nickname>{nickname}</Nickname>
        <Date>{date}</Date>
      </Info>
      <Content value={text} ref={textRef} readOnly disabled />
    </Base>
  );
}

export default Comment;
