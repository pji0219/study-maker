import React from 'react';
import styled from '@emotion/styled';

import Card from './Card';

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
  return (
    <Base>
      <ArticleList>
        <Card />
      </ArticleList>
    </Base>
  );
}

export default Articles;
