import React from 'react';
import { useParams } from 'react-router-dom';
import MyPage from '../components/MyPage';

function Mypage() {
  const params = useParams();
  const username = params.username;

  return <MyPage username={username} />;
}

export default Mypage;
