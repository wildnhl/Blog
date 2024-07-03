import { configureStore } from '@reduxjs/toolkit';
import { authReducer, fetchRefreshJwtToken } from './auth-slice';
import { currentUserReducer } from './current-user-slice';
import { languageReducer } from './language-slice';
import { modalReducer } from './modal-slice';
import { postReducer } from './post-slice';
import { postsReducer } from './posts-slice';

import { isTokenExpired } from '../utils/isTokenExpired';
let isRefreshing = false;
const tokenExpirationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const currentToken = state.auth.jwToken?.access;

  if (currentToken && !isRefreshing && isTokenExpired(currentToken)) {
    isRefreshing = true;
    store.dispatch(fetchRefreshJwtToken()).finally(() => {
      isRefreshing = false;
    });
  }

  return next(action);
};
export const store = configureStore({
  reducer: {
    language: languageReducer,
    modal: modalReducer,
    posts: postsReducer,
    auth: authReducer,
    post: postReducer,
    currentUser: currentUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenExpirationMiddleware)
});
