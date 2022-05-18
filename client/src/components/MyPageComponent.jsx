import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaUserCircle, FaClock, FaComments } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadUserArticles } from '../redux-modules/article';
import { loadCommentsByUser } from '../redux-modules/comment';

const Base = styled.div`
  width: 100vw;
  height: calc(100vh - 180px);
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

const SideMenu = styled.aside`
  width: 200px;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 1px 5px 0px #9e9e9e;
  display: flex;
  flex-direction: column;
  align-items: center;

  & span {
    margin-top: 20px;
    cursor: pointer;
  }

  & span:hover {
    color: #6666ff;
  }
`;

const MyPageContainer = styled.div`
  width: 1000px;
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

const List = styled.ul`
  width: auto;
  height: auto;
  background-color: #fff;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow: 0px 1px 5px 0px #9e9e9e;
`;

const ItemLink = styled(Link)`
  display: block;
  text-decoration: none;
  width: auto;
  height: 70px;
  color: #222;
  font-size: 17px;
  margin: 10px 20px 0 20px;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #222;
  }
`;

const ArticleTitle = styled.span`
  position: absolute;
  left: 0;
  font-size: 17px;
`;

const ArticleDate = styled.span`
  position: absolute;
  right: 0;
  font-size: 17px;
  vertical-align: middle;
`;

const ArticleComments = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 17px;
  margin-bottom: 10px;
  vertical-align: middle;
`;

const CommentText = styled.textarea`
  position: absolute;
  left: 0;
  background-color: #fff;
  font-size: 17px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  resize: none;
  width: 730px;
  border: none;
  cursor: pointer;
`;

const CommentDate = styled.span`
  position: absolute;
  right: 0;
  font-size: 17px;
  vertical-align: middle;
`;

const DateIcon = styled(FaClock)`
  color: #6666ff;
`;

const CommentsIcon = styled(FaComments)`
  color: #6666ff;
`;

const P = styled.p`
  position: absolute;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 24px;
  color: #222;
`;

function MyPageComponent({ username }) {
  const { nickname } = useSelector((state) => state.auth);
  const { userArticles } = useSelector((state) => state.article);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [selectMyArticle, setSelectMyArticle] = useState(true);
  useEffect(() => {
    dispatch(loadUserArticles(username));
  }, [dispatch, username]);

  const loadMyArticles = () => {
    dispatch(loadUserArticles(username));
    setSelectMyArticle(true);
  };

  const loadMyComments = () => {
    dispatch(loadCommentsByUser(username));
    setSelectMyArticle(false);
  };

  return (
    <Base>
      <SideMenu>
        <span className="myarticle" onClick={loadMyArticles}>
          나의 게시물
        </span>
        <span className="mycomment" onClick={loadMyComments}>
          나의 댓글
        </span>
      </SideMenu>
      <MyPageContainer>
        <TitleContainer>
          <NicknameContainer>
            <UserCircle />
            &nbsp;
            <Nickname>{nickname}</Nickname>
            <Username>({username})</Username>
          </NicknameContainer>
          {selectMyArticle ? <Title>의 게시글</Title> : <Title>의 댓글</Title>}
        </TitleContainer>
        <List>
          {selectMyArticle ? (
            <>
              {userArticles.length === 0 && <P>작성한 게시물이 없습니다.</P>}
              {userArticles.map((article) => (
                <ItemLink to={`/article/${article._id}`} key={article._id}>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleDate>
                    <DateIcon />
                    &nbsp;
                    {article.date}
                  </ArticleDate>
                  <ArticleComments>
                    <CommentsIcon />
                    &nbsp;
                    {article.comments.length}
                  </ArticleComments>
                </ItemLink>
              ))}
            </>
          ) : (
            <>
              {comments.length === 0 && <P>작성한 댓글이 없습니다.</P>}
              {comments.map((comment) => (
                <ItemLink to={`/article/${comment.article}`} key={comment._id}>
                  <CommentText disabled>{comment.text}</CommentText>
                  <CommentDate>
                    <DateIcon />
                    &nbsp;
                    {comment.date}
                  </CommentDate>
                </ItemLink>
              ))}
            </>
          )}
        </List>
      </MyPageContainer>
    </Base>
  );
}

export default MyPageComponent;
