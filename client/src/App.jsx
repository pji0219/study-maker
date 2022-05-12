import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Global } from '@emotion/react';
import { useDispatch } from 'react-redux';

import reset from './css-reset/Reset';
import Header from './components/Header';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { userLoad } from './redux-modules/auth';
import WritePage from './pages/WritePage';
import UpdatePage from './pages/UpdatePage';
import MyPage from './pages/MyPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLoad());
  }, [dispatch]);

  return (
    <>
      <Global styles={reset} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </>
  );
}

export default App;
