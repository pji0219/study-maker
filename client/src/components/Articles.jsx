import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from './Card';
import { loadArticles } from '../redux-modules/article';

const Base = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  margin-top: 40px;
`;

const ArticleList = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 420px);
  gap: 10px;
`;

function Articles() {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(loadArticles());
  }, [dispatch]);

  return (
    <Base>
      <ArticleList>
        {articles.map((article) => (
          <Link to={`/article/${article._id}`} key={article._id}>
            <Card
              title={article.title}
              nickname={article.nickname}
              date={article.date}
            />
          </Link>
        ))}
      </ArticleList>
    </Base>
  );
}

export default Articles;
