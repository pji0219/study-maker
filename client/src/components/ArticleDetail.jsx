import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import { loadArticle } from '../redux-modules/article';

const Base = styled.div`
  width: 100vw;
  height: 100vh;
  margin-top: 40px;
`;

const TextEditor = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 100%;
  border-top: 1px solid #6666ff;
`;

const TitleContainer = styled.div`
  width: auto;
  height: 60px;
  border-bottom: 1px solid #6666ff;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 24px;
  color: #222;
  margin: 0 10px;
`;

const Content = styled.textarea`
  width: auto;
  height: fit-content;
  margin-top: 10px;
  margin-right: 10px;
  resize: none;
  background-color: #fff;
  border: none;
  font-size: 17px;
`;

function ArticleDetail({ id }) {
  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(loadArticle(id));
  }, [dispatch, id]);

  return (
    <Base>
      <TextEditor>
        <TitleContainer>
          <Title>{article.title}</Title>
        </TitleContainer>
        <Content disabled>{article.text}</Content>
      </TextEditor>
    </Base>
  );
}

export default ArticleDetail;
