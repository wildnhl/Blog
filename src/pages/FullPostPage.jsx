import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchData } from '../redux/post-slice';

import { FullPost } from '../components/FullPost';
import { Title } from '../components/Title';
import { PostNavigation } from '../components/PostNavigation';

export function FullPostPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const post = useSelector((state) => state.post.data);
  const postError = useSelector((state) => state.post.error);
  const postIsLoading = useSelector((state) => state.post.isLoading);

  useEffect(() => {
    dispatch(fetchData(id));
  }, [dispatch, id]);

  return (
    <>
      <Title titleName={post.title} />
      <FullPost
        textPost={post.text}
        image={post.image}
        error={postError}
        isLoading={postIsLoading}
      />
      <PostNavigation />
    </>
  );
}
