import React from 'react';
import { useParams } from 'react-router-dom';

import MyPageComponent from '../components/MyPageComponent';

function MyPage() {
  const params = useParams();
  const username = params.username;

  return <MyPageComponent username={username} />;
}

export default MyPage;
