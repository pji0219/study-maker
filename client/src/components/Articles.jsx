import React from 'react';
import styled from '@emotion/styled';

import study from '../images/study2.jpeg';

const Base = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  margin-top: 40px;
`;

const ArticleList = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 100%;
  /* background-color: royalblue; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 420px);
  gap: 10px;
`;

const Card = styled.div`
  background-color: #eeeeee;
  border-radius: 10px;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 276.83px;
  margin: 0;
  overflow: hidden;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  > img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 130px;
  margin: 10px 0 0 0;
  font-size: 15px;
  color: #222;
  position: relative;

  > .title {
    position: absolute;
    top: 0;
    left: 10px;
  }

  > .nickname {
    position: absolute;
    left: 10px;
    bottom: 50%;
  }

  > .time {
    position: absolute;
    right: 10px;
    bottom: 50%;
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
          <InfoContainer>
            <span className="title">서울 자바스크립트 스터디 하실분</span>
            <span className="nickname">코린이</span>
            <span className="time">22 03 25 1:30:21 오후</span>
          </InfoContainer>
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
