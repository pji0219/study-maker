import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateArticle from '../components/UpdateArticle';

function UpdatePage() {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <UpdateArticle articleId={id} />
    </div>
  );
}

export default UpdatePage;
