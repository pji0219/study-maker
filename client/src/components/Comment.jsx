import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaClock, FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { removeComment, updateComment } from '../redux-modules/comment';

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

  // 댓글 수정을 위해 기존 댓글의 텍스트를 초기값으로 넣어줌
  const [commetText, setCommentText] = useState(text);

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

  // 댓글 수정 취소시 새로고침 (댓글 textarea의 자동 높이 조절을 위해서)
  const refresh = () => {
    window.location.reload();
  };

  const onUpdateCheck = () => {
    setUpdateCheck(true);
  };

  const onUpdateCancel = () => {
    setUpdateCheck(false);
  };

  const onChange = (event) => {
    const value = event.target.value;
    setCommentText(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedComment = {
      id: commentId,
      text: commetText,
    };
    dispatch(updateComment(updatedComment));
    setUpdateCheck(false);
  };

  const onDelete = () => {
    dispatch(removeComment(commentId));
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
            <UpdateBtn onClick={onUpdateCheck}>
              <UpdateIcon />
            </UpdateBtn>
            <DeleteBtn onClick={onDelete}>
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
        <form onSubmit={onSubmit}>
          <Content
            value={commetText}
            ref={textRef}
            onInput={autoSize}
            onChange={onChange}
            required
            onClick={autoSize}
          />
          <SubmitContainer>
            <SummitBtn type="submit">수정</SummitBtn>
            <CancelBtn
              onClick={() => {
                onUpdateCancel();
                refresh();
              }}
            >
              취소
            </CancelBtn>
          </SubmitContainer>
        </form>
      ) : (
        <Content value={text} ref={textRef} readOnly disabled />
      )}
    </Base>
  );
}

export default Comment;
