import { PostsContainer } from '../components/PostsContainer';
import { Title } from '../components/Title';

export function PostsPage() {
  return (
    <>
      <Title titleName='allPosts' />
      <PostsContainer />
    </>
  );
}
