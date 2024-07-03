import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData, fetchUserPosts } from '../services/currentUser';

export const fetchCurrentUser = createAsyncThunk(
  'currentUser/fetchCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    const jwt = getState().auth.jwToken.access;
    console.log(jwt);
    if (!jwt) return null;
    try {
      const userData = await fetchUserData();
      if (userData.statusText !== undefined && !userData.ok) {
        throw new Error('token expired');
      }
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserPostsThunk = createAsyncThunk(
  'currentUser/fetchUserPosts',
  async (opts = {}, { getState }) => {
    const { search, pageNumber = 1 } = opts;
    const { limit } = getState().currentUser;

    const offset = (pageNumber - 1) * limit;
    return await fetchUserPosts({ search, limit, offset });
  }
);

const initialState = {
  user: null,
  userPosts: [],
  isLoading: false,
  error: null,
  limit: 5,
  pagesCounter: 0
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setSignOut: (state, action) => {
      state.user = null;
      state.userPosts = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.user = null;
    });
    builder
      .addCase(fetchUserPostsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPostsThunk.fulfilled, (state, action) => {
        state.userPosts = action.payload.results;
        state.isLoading = false;
        console.log(action.payload);
        if (state.pagesCounter) return;

        state.pagesCounter = Math.ceil(action.payload.count / state.limit);
      })
      .addCase(fetchUserPostsThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

export const { setSignOut } = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
