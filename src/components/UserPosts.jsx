import { PostsList } from './PostsList';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserPostsThunk } from '../redux/current-user-slice';
import { PostsPagination } from '../components/PostsPagination';

export function UserPosts() {
  const [orderValue, setOrderValue] = useState('');
  const { userPostNumber } = useParams();
  const dispatch = useDispatch();

  const currentUserPosts = useSelector((state) => state.currentUser.userPosts);
  const pagesCounter = useSelector((state) => state.currentUser.pagesCounter);
  const currentUserPostsError = useSelector((state) => state.currentUser.error);
  const currentUserPostsIsLoading = useSelector(
    (state) => state.currentUser.isLoading
  );

  useEffect(() => {
    dispatch(
      fetchUserPostsThunk({
        pageNumber: userPostNumber,
        ordering: orderValue
      })
    );
  }, [dispatch, userPostNumber, orderValue]);

  return (
    <>
      <PostsList
        data={currentUserPosts}
        error={currentUserPostsError}
        isLoading={currentUserPostsIsLoading}
      />
      <PostsPagination
        setOrderValue={setOrderValue}
        pageNumberCurrent={userPostNumber}
        path={'/user-posts/'}
        pagesCounter={pagesCounter}
        sort={false}
      />
    </>
  );
}
