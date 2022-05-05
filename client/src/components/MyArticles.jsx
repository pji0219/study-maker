import React from 'react';
import styled from '@emotion/styled';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const Base = styled.div`
  width: 100vw;
  height: calc(100vh - 180px);
  margin-top: 40px;
`;

const Container = styled.ul`
  margin: 0 auto;
  width: 1200px;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 1px 5px 0px #9e9e9e;
`;

const TabContainer = styled.div`
  width: auto;
  height: 60px;
  border-bottom: 1px solid #6666ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const UserCircle = styled(FaUserCircle)`
  font-size: 32px;
  color: #6666ff;
`;

const Nickname = styled.span`
  font-size: 24px;
  color: #222;
`;

const Username = styled.span`
  font-size: 24px;
  color: #222;
  margin-bottom: 7px;
`;

const Tab = styled.ul`
  background-color: beige;
  width: 500px;
  height: 60px;
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .tab {
    background-color: brown;
    width: 240px;
    font-size: 24px;
    text-align: center;
    /* &:not(:last-of-type) {
      margin-right: 20px;
    } */

    &:hover {
      background-color: #fff;
    }
  }
`;

function MyArticles() {
  const { nickname, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLoadMyArticle = () => {
    dispatch();
  };

  return (
    <Base>
      <Container>
        <TabContainer>
          <NicknameContainer>
            <UserCircle />
            &nbsp;
            <Nickname>{nickname}</Nickname>
            <Username>({username})</Username>
          </NicknameContainer>
          <Tab>
            <li className="tab">내가 쓴 게시물 보기</li>
            <li className="tab">내가 쓴 댓글 보기</li>
          </Tab>
        </TabContainer>
      </Container>
    </Base>
  );
}

export default MyArticles;
