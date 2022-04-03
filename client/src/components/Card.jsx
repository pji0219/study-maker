import React from 'react';
import styled from '@emotion/styled';

import study from '../images/study2.jpeg';

const Base = styled.div`
  background-color: #eeeeee;
  border-radius: 10px;
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

function Card({ title, nickname, date }) {
  return (
    <Base>
      <ImgContainer>
        <img src={study} alt="study" />
      </ImgContainer>
      <InfoContainer>
        <span className="title">{title}</span>
        <span className="nickname">{nickname}</span>
        <span className="time">{date}</span>
      </InfoContainer>
    </Base>
  );
}

export default Card;
