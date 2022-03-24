import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/mypage/:username" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
