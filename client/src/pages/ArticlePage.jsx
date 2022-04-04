import React from 'react';
import { useParams } from 'react-router-dom';

import ArticleDetail from '../components/ArticleDetail';

function ArticlePage() {
  const params = useParams();
  const id = params.id;

  return <ArticleDetail articleId={id} />;
}

export default ArticlePage;
