import React, { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaClock } from 'react-icons/fa';

const Base = styled.li`
  width: 1200px;
  height: auto;
  color: #222;
  font-size: 17px;
`;

const Line = styled.hr`
  width: auto;
  margin: 0 20px;
  color: #222;
`;

const Info = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  position: relative;
`;

const NicknameContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
`;

const Nickname = styled.span``;

const UserIcon = styled(FaUserCircle)`
  font-size: 24px;
  color: #6666ff;
  margin-left: 20px;
`;

const DateContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
`;

const Date = styled.span`
  margin-right: 20px;
`;

const ClockIcon = styled(FaClock)`
  font-size: 24px;
  color: #6666ff;
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
      <Line />
      <Info>
        <NicknameContainer>
          <UserIcon />
          &nbsp;
          <Nickname>{nickname}</Nickname>
        </NicknameContainer>
        <DateContainer>
          <ClockIcon />
          &nbsp;
          <Date>{date}</Date>
        </DateContainer>
      </Info>
      <Content value={text} ref={textRef} readOnly disabled />
    </Base>
  );
}

export default Comment;
