import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Global } from '@emotion/react';
import { useDispatch } from 'react-redux';

import reset from './css-reset/Reset';
import Header from './components/Header';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import { userLoad } from './redux-modules/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLoad());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Global styles={reset} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/mypage/:username" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
