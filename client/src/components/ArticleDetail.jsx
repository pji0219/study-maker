import React, { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaClock } from 'react-icons/fa';

import { loadArticle } from '../redux-modules/article';
import Comments from './Comments';

const Base = styled.div`
  width: 100vw;
  height: auto;
  margin-top: 40px;
`;

const TextEditor = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 100%;
  border-top: 1px solid #6666ff;
  background-color: #fff;
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

const ClockIcon = styled(FaClock)`
  font-size: 24px;
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
  const textRef = useRef();

  // 텍스트를 불러올 시에 높이 자동 조절
  const autoSize = useCallback(() => {
    const obj = textRef.current;
    obj.style.height = 'auto';
    obj.style.height = obj.scrollHeight + 'px';
  }, []);

  useEffect(() => {
    dispatch(loadArticle(articleId));
  }, [dispatch, articleId]);

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
          <ClockIcon />
          &nbsp;
          <Date>{article.date}</Date>
        </InfoContainer>
        <Content readOnly disabled value={article.text} ref={textRef} />
      </TextEditor>
      <Comments articleId={articleId} />
    </Base>
  );
}

export default ArticleDetail;
