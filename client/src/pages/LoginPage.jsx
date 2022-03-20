import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import study from '../images/study.jpg';
import { login, signupUser } from '../redux-modules/auth';

const Base = styled.div`
  width: 100vw;
  height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

// 이미지
const Img = styled.img``;

// 로그인 폼
const LoginForm = styled.div`
  position: absolute;
  width: 520px;
  height: 940px;
  background-color: #263238;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Title = styled.span`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const Input = styled.input`
  margin-top: 20px;
  width: 400px;
  height: 50px;
  border: 0;
  border-radius: 30px;
  padding: 0 16px;
  color: #333;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #f4511e;
  }

  &::placeholder {
    font-size: 18px;
  }
`;
const Error = styled.span`
  margin-top: 5px;
  color: #d32f2f;
`;
const SubmitBtn = styled.button`
  width: 150px;
  height: 50px;
  border: 0;
  border-radius: 30px;
  margin-top: 20px;
  background-color: #f4511e;
  color: #fff;
  font-size: 18px;

  &:hover {
    cursor: pointer;
    background-color: #ffa726;
  }
`;
const SignupCheckBox = styled.div`
  margin-top: 20px;

  & > label {
    color: #fff;
  }
`;

function LoginPage() {
  const dispatch = useDispatch();
  const [signup, setSignup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (signup) {
      dispatch(signupUser(data));
    } else {
      dispatch(login(data));
    }
  };

  const onChange = (event) => {
    const checked = event.target.checked;
    setSignup(checked);
  };

  return (
    <Base>
      <LoginForm>
        <Img src={study} alt="study-logo" />
        <TitleContainer>
          <Title>Study maker</Title>
        </TitleContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="아이디"
            {...register('username', { required: true, minLength: 3 })}
          />
          {errors.username?.type === 'required' && (
            <Error>아이디는 필수 값입니다.</Error>
          )}
          {errors.username?.type === 'minLength' && (
            <Error>아이디는 3글자 이상이어야 합니다.</Error>
          )}
          <Input
            type="text"
            placeholder="비밀번호"
            {...register('password', { required: true, minLength: 5 })}
          />
          {errors.password?.type === 'required' && (
            <Error>비밀번호는 필수 값입니다.</Error>
          )}
          {errors.password?.type === 'minLength' && (
            <Error>비밀번호는 5글자 이상이어야 합니다.</Error>
          )}
          {signup && (
            <>
              <Input
                type="text"
                placeholder="닉네임"
                {...register('nickname', { required: true, minLength: 3 })}
              />
              {errors.nickname?.type === 'required' && (
                <Error>닉네임은 필수 값입니다.</Error>
              )}
              {errors.nickname?.type === 'minLength' && (
                <Error>닉네임은 3글자 이상이어야 합니다.</Error>
              )}
            </>
          )}
          <SignupCheckBox>
            <input
              id="signup"
              type="checkbox"
              onChange={onChange}
              checked={signup}
            />
            <label htmlFor="signup">새로운 계정을 만드시겠습니까?</label>
          </SignupCheckBox>
          <SubmitBtn type="submit">{signup ? '회원가입' : '로그인'}</SubmitBtn>
        </Form>
      </LoginForm>
    </Base>
  );
}

export default LoginPage;
