import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Post } from './Post';

import cl from '../styles/postsList.module.scss';

export function PostsList({
  data,
  error,
  isLoading,
  orderValue,
  pageNumberCurrent,
  fetchPost
}) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     fetchPost({ pageNumber: pageNumberCurrent, ordering: orderValue })
  //   );
  // }, [dispatch, pageNumberCurrent, orderValue, fetchPost]);

  function renderPosts() {
    if (error) {
      return <div className="text-danger">Error: {error}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (data.length === 0) {
      return <h1>NO RESULTS</h1>;
    }

    return (
      <>
        {data.map((post, index) => (
          <Post key={post.id} firstPost={index === 0} {...post} />
        ))}
      </>
    );
  }

  return (
    <>
      <div className={cl.position}>{renderPosts()}</div>
    </>
  );
}
