import React, { useState } from 'react';
import { Global } from '@emotion/react';

import LoginPage from '../pages/LoginPage';
import reset from '../css-reset/Reset';

function Auth({ children }) {
  const [user, setUser] = useState(false);

  return (
    <>
      <Global styles={reset} />
      {user ? children : <LoginPage />}
    </>
  );
}

export default Auth;
