import React from 'react';
import styled from '@emotion/styled';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserArticles } from '../redux-modules/article';

const Base = styled.div`
  width: 100vw;
  height: calc(100vh - 180px);
  margin-top: 40px;
`;

const MyArticlesContainer = styled.ul`
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

const Title = styled.span`
  font-size: 24px;
`;

const ArticleList = styled.ul`
  width: auto;
  height: 92%;
  background-color: #fff;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const Article = styled.li`
  width: 1200px;
  height: 70px;
  color: #222;
  font-size: 17px;
`;

const ArticleTitle = styled.span``;

function MyArticles() {
  const { nickname, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Base>
      <MyArticlesContainer>
        <TitleContainer>
          <NicknameContainer>
            <UserCircle />
            &nbsp;
            <Nickname>{nickname}</Nickname>
            <Username>({username})</Username>
          </NicknameContainer>
          <Title>의 게시글</Title>
        </TitleContainer>
        <ArticleList></ArticleList>
      </MyArticlesContainer>
    </Base>
  );
}

export default MyArticles;
