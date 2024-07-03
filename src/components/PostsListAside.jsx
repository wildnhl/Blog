import { PostAside } from './PostAside';

import style from '../styles/postsListAside.module.scss';

export function PostsListAside({ data, error, isLoading }) {
  function renderPosts() {
    if (error) {
      return <div className='text-danger'>Error: {error}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return data.map((post) => <PostAside key={post.id} {...post} />);
  }

  return <div className={style.position}>{renderPosts()}</div>;
}
