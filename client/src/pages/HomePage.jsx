import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userFetch } from '../redux-modules/auth';

function HomePage() {
  const { loading, users, err } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userFetch());
  }, [dispatch]);

  if (loading) return <div>loading..</div>;
  if (err) return <div>error</div>;
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default HomePage;
