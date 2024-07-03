import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchData } from '../redux/posts-slice';

import { PostsList } from './PostsList';

export function SearchResult() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const postsError = useSelector((state) => state.posts.error);
  const postsIsLoading = useSelector((state) => state.posts.isLoading);
  const { query } = useParams();

  useEffect(() => {
    dispatch(fetchData({ search: query }));
  }, [dispatch, query]);

  return (
    <PostsList data={posts} error={postsError} isLoading={postsIsLoading} />
  );
}
