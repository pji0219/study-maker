import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import LoginPage from '../pages/LoginPage';
import reset from '../css-reset/Reset';
import { userLoad } from '../redux-modules/auth';

function Auth({ children }) {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLoad());
  }, [dispatch]);

  return (
    <>
      <Global styles={reset} />
      {isAuth ? children : <LoginPage />}
    </>
  );
}

export default Auth;
