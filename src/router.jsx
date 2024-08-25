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
        path: '/Blog',
        element: <PostsPage />,
        children:[
          {
        path: '/Blog/posts/page/:postsPageNumber',
        element: <PostsPage />
      },
      {
        path: '/Blog/post/:id',
        element: <FullPostPage />
      },
      {
        path: '/Blog/sign-in',
        element: <SignInPage />
      },
      {
        path: '/Blog/sign-up',
        element: <SignUpPage />
      },
      {
        path: '/Blog/reg-confirm',
        element: <RegistryConfirmPage />
      },
      {
        path: '/Blog/auth/activate/:uid/:token',
        element: <AuthActivatePage />
      },
      {
        path: '/Blog/user-posts',
        element: <UserPostsPage />
      },
      {
        path: '/Blog/user-posts/:userPostNumber',
        element: <UserPostsPage />
      },
      {
        path: '/Blog/posts/search/:query',
        element: <SearchResult />
      },
      {
        path: '/Blog/posts/new',
        element: <NewPost />
      }
        ]
      },
    ]
  }
]);
