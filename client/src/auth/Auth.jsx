import React from 'react';
import { Global } from '@emotion/react';
import { useSelector } from 'react-redux';

import LoginPage from '../pages/LoginPage';
import reset from '../css-reset/Reset';

function Auth({ children }) {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <>
      <Global styles={reset} />
      {isAuth ? children : <LoginPage />}
    </>
  );
}

export default Auth;
