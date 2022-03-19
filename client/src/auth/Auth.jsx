import React, { useState } from 'react';
import LoginPage from '../pages/LoginPage';

function Auth({ children }) {
  const [user, setUser] = useState(false);

  return <>{user ? children : <LoginPage />}</>;
}

export default Auth;
