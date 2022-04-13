import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaClock, FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { updateComment } from '../redux-modules/comment';

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

const UpdateContainer = styled.div`
  position: absolute;
  right: 250px;
  display: flex;
  align-items: center;
`;

const UpdateBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const UpdateIcon = styled(FaPencilAlt)`
  font-size: 17px;
  color: #2e7d32;
`;

const DeleteBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const DeleteIcon = styled(RiDeleteBin5Fill)`
  font-size: 17px;
  color: #c62828;
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
  &:focus {
    outline: none;
  }
`;

const SubmitContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const SummitBtn = styled.button``;

const CancelBtn = styled.button``;

function Comment({ commentId, text, date, author, nickname }) {
  const dispatch = useDispatch();
  const textRef = useRef();
  const { username } = useSelector((state) => state.auth);
  const [updateCheck, setUpdateCheck] = useState(false);
  const [value, setValue] = useState('');
  const [comment, setComment] = useState({
    id: '',
    text: '',
  });

  /* 
    댓글 텍스트를 불러올 시에 댓글창 높이 자동 조절
    또는 댓글 수정 인풋시 댓글창 높이 자동 조절
  */
  const autoSize = useCallback(() => {
    const obj = textRef.current;
    obj.style.height = 'auto';
    obj.style.height = obj.scrollHeight + 'px';
  }, []);

  useEffect(() => {
    autoSize();
  }, [text, autoSize]);

  const onUpdateCheck = () => {
    setUpdateCheck(true);
  };

  const onUpdateCancel = () => {
    setUpdateCheck(false);
  };

  return (
    <Base>
      <Line />
      <Info>
        <NicknameContainer>
          <UserIcon />
          &nbsp;
          <Nickname>{nickname}</Nickname>
        </NicknameContainer>
        {username === author && (
          <UpdateContainer>
            <UpdateBtn
              onClick={() => {
                onUpdateCheck();
                autoSize();
              }}
            >
              <UpdateIcon />
            </UpdateBtn>
            <DeleteBtn>
              <DeleteIcon />
            </DeleteBtn>
          </UpdateContainer>
        )}
        <DateContainer>
          <ClockIcon />
          &nbsp;
          <Date>{date}</Date>
        </DateContainer>
      </Info>
      {updateCheck ? (
        <>
          <Content defaultValue={text} ref={textRef} onChange={autoSize} />
          <SubmitContainer>
            <SummitBtn>수정</SummitBtn>
            <CancelBtn
              onClick={() => {
                onUpdateCancel();
                autoSize();
              }}
            >
              취소
            </CancelBtn>
          </SubmitContainer>
        </>
      ) : (
        <Content value={text} ref={textRef} readOnly disabled />
      )}
    </Base>
  );
}

export default Comment;
