import { UserPosts } from '../components/UserPosts';
import { Title } from '../components/Title';

export function UserPostsPage() {
  return (
    <>
      <Title titleName="allPosts" />
      <UserPosts />
    </>
  );
}
