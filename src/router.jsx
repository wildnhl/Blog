import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { PostsPage } from './pages/PostsPage';
import { FullPostPage } from './pages/FullPostPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { RegistryConfirmPage } from './pages/RegistryConfirmPage';
import { AuthActivatePage } from './pages/AuthActivatePage';
import { UserPostsPage } from './pages/UserPostsPage';
import { NewPost } from './pages/NewPost';
import { SearchResult } from './components/SearchResult';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PostsPage />
      },
      {
        path: '/posts/page/:postsPageNumber',
        element: <PostsPage />
      },
      {
        path: '/post/:id',
        element: <FullPostPage />
      },
      {
        path: '/sign-in',
        element: <SignInPage />
      },
      {
        path: '/sign-up',
        element: <SignUpPage />
      },
      {
        path: '/reg-confirm',
        element: <RegistryConfirmPage />
      },
      {
        path: '/auth/activate/:uid/:token',
        element: <AuthActivatePage />
      },
      {
        path: '/user-posts',
        element: <UserPostsPage />
      },
      {
        path: '/user-posts/:userPostNumber',
        element: <UserPostsPage />
      },
      {
        path: '/posts/search/:query',
        element: <SearchResult />
      },
      {
        path: '/posts/new',
        element: <NewPost />
      }
    ]
  }
]);
