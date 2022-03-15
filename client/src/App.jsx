import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticlePage from './pages/articlePage';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/article/:id*" element={<ArticlePage />} />
        <Route path="/mypage/:username*" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
