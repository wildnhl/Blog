import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchData } from '../redux/posts-slice';

import { PostsList } from './PostsList';
import { PostsListAside } from './PostsListAside';
import { PostsPagination } from '../components/PostsPagination';

import style from '../styles/postsContainer.module.scss';

export function PostsContainer() {
  const dispatch = useDispatch();
  const [orderValue, setOrderValue] = useState('');
  const { postsPageNumber: pageNumberCurrent } = useParams();
  const pagesCounter = useSelector((state) => state.posts.pagesCounter);

  const posts = useSelector((state) => state.posts.data);
  const postsError = useSelector((state) => state.posts.error);
  const postsIsLoading = useSelector((state) => state.posts.isLoading);

  useEffect(() => {
    dispatch(
      fetchData({
        pageNumber: pageNumberCurrent,
        ordering: orderValue
      })
    );
  }, [dispatch, pageNumberCurrent, orderValue]);

  return (
    <>
      <div className={style.position}>
        <PostsList data={posts} error={postsError} isLoading={postsIsLoading} />
        <PostsListAside
          data={posts}
          error={postsError}
          isLoading={postsIsLoading}
        />
      </div>
      <PostsPagination
        setOrderValue={setOrderValue}
        pageNumberCurrent={pageNumberCurrent}
        path={'/posts/page/'}
        pagesCounter={pagesCounter}
        sort={true}
      />
    </>
  );
}
