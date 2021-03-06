import React, { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaClock, FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useNavigate, Link } from 'react-router-dom';

import { loadArticle, removeArticle } from '../redux-modules/article';
import Comments from './Comments';
import NewCommentForm from './NewCommentForm';

const Base = styled.div`
  width: 100vw;
  height: auto;
  margin-top: 40px;
`;

const TextEditor = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 1px 5px 0px #9e9e9e;
`;

const TitleContainer = styled.div`
  width: auto;
  height: 60px;
  border-bottom: 1px solid #6666ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #222;
`;

const Title = styled.span`
  font-size: 24px;
  margin-left: 20px;
`;

const NicknameContainer = styled.span`
  margin-right: 20px;
  display: flex;
  align-items: center;
  color: #222;
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 24px;
  color: #6666ff;
`;

const Nickname = styled.span`
  font-size: 17px;
`;

const InfoContainer = styled.div`
  width: auto;
  height: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #222;
`;

const UpdateContainer = styled.div`
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
  margin-right: 20px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ClockIcon = styled(FaClock)`
  font-size: 24px;
  color: #6666ff;
`;

const Date = styled.span`
  font-size: 17px;
  margin-right: 20px;
`;

const Content = styled.textarea`
  width: 1100px;
  height: auto;
  margin-top: 10px;
  margin-left: 20px;
  resize: none;
  background-color: #fff;
  color: #222;
  border: none;
  font-size: 15px;
`;

function ArticleDetail({ articleId }) {
  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.article);
  const { username } = useSelector((state) => state.auth);
  const textRef = useRef();
  const navigate = useNavigate();

  // ???????????? ????????? ?????? ?????? ?????? ??????
  const autoSize = useCallback(() => {
    const obj = textRef.current;
    obj.style.height = 'auto';
    obj.style.height = obj.scrollHeight + 'px';
  }, []);

  useEffect(() => {
    dispatch(loadArticle(articleId));
  }, [dispatch, articleId]);

  const onDelete = () => {
    dispatch(removeArticle(articleId, navigate));
  };

  useEffect(() => {
    autoSize();
  }, [article, autoSize]);

  return (
    <Base>
      <TextEditor>
        <TitleContainer>
          <Title>{article.title}</Title>
          <NicknameContainer>
            <UserIcon />
            &nbsp;
            <Nickname>{article.nickname}</Nickname>
          </NicknameContainer>
        </TitleContainer>
        <InfoContainer>
          {username === article.username && (
            <UpdateContainer>
              <Link to={`/update/${articleId}`}>
                <UpdateBtn>
                  <UpdateIcon />
                </UpdateBtn>
              </Link>
              <DeleteBtn onClick={onDelete}>
                <DeleteIcon />
              </DeleteBtn>
            </UpdateContainer>
          )}
          <DateContainer>
            <ClockIcon />
            &nbsp;
            <Date>{article.date}</Date>
          </DateContainer>
        </InfoContainer>
        <Content readOnly disabled value={article.text} ref={textRef} />
        <NewCommentForm articleId={articleId} />
        <Comments articleId={articleId} />
      </TextEditor>
    </Base>
  );
}

export default ArticleDetail;
