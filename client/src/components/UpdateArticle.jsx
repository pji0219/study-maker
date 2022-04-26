import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Base = styled.div`
  width: 100vw;
  height: calc(100vh - 180px);
  margin-top: 40px;
`;

const TextEditor = styled.div`
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
  align-items: center;
  color: #222;
`;

const Title = styled.input`
  width: 1100px;
  height: 50px;
  font-size: 24px;
  margin-left: 20px;
  border: none;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 1150px;
  height: calc(100vh - 340px);
  margin-top: 10px;
  margin-left: 20px;
  resize: none;
  background-color: #fff;
  color: #222;
  border: none;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const SubmitBtnContainer = styled.div`
  width: 1200px;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SubmitBtn = styled.button`
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 30px;
  margin-right: 10px;
  background-color: #6666ff;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 30px;
  margin-right: 20px;
  background-color: #6666ff;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
`;

const BtnLink = styled(Link)`
  text-decoration: none;
`;

function UpdateArticle() {
  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <Base>
      <TextEditor>
        <form onSubmit={onSubmit}>
          <TitleContainer>
            <Title />
          </TitleContainer>
          <TextArea />
          <SubmitBtnContainer>
            <SubmitBtn>확인</SubmitBtn>
            <BtnLink to="/">
              <CancelBtn>취소</CancelBtn>
            </BtnLink>
          </SubmitBtnContainer>
        </form>
      </TextEditor>
    </Base>
  );
}

export default UpdateArticle;
