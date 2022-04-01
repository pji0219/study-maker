import React from 'react';
import { useParams } from 'react-router-dom';

function ArticlePage() {
  const params = useParams();
  const id = params.id;

  return <div>id: {id}</div>;
}

export default ArticlePage;
