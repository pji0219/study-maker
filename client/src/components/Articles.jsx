import React from 'react';
import styled from '@emotion/styled';

import study from '../images/study2.jpeg';

const Base = styled.div`
  width: 100%;
  height: 1500px;
  margin-top: 40px;
`;

const ArticleList = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 1500px;
  background-color: royalblue;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 420px);
`;

const Card = styled.div`
  background-color: purple;
  border: 1px solid;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  > img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

function Articles() {
  return (
    <Base>
      <ArticleList>
        <Card>
          <ImgContainer>
            <img src={study} alt="study" />
          </ImgContainer>
        </Card>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ArticleList>
    </Base>
  );
}

export default Articles;
