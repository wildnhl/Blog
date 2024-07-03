import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, fetchCreatePost } from '../services/posts';

export const fetchData = createAsyncThunk(
  'posts/fetchData',
  async (opts = {}, { getState }) => {
    const { search, pageNumber = 1, ordering = 'date' } = opts;
    const { limit } = getState().posts;

    const offset = (pageNumber - 1) * limit;
    return await fetchPosts({ search, limit, offset, ordering });
  }
);

export const fetchCreatePostThunk = createAsyncThunk(
  'posts/fetchCreatePostThunk',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetchCreatePost(formData);
      if (!(response.status >= 200) && !(response.status <= 299)) {
        throw new Error('Fail request');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  limit: 5,
  pagesCounter: 0,
  createdPost: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLikesAction: (state, action) => {
      const post = state.data.find((el) => el.id === action.payload);
      post.likes += 1;
    },
    setDislikesAction: (state, action) => {
      const post = state.data.find((el) => el.id === action.payload);
      post.likes -= 1;
    },
    setBookmarkAction: (state, action) => {
      const post = state.data.find((el) => el.id === action.payload);
      post.isFavorite = !post.isFavorite;
    },
    setClearCreatedPost: (state, action) => {
      state.createdPost = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.results;
        state.isLoading = false;

        if (state.pagesCounter) return;
        state.pagesCounter = Math.ceil(action.payload.count / state.limit);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });

    builder.addCase(fetchCreatePostThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.createdPost = action.payload;
      // TODO: redirect to post page
    });
  }
});

export const {
  setLikesAction,
  setDislikesAction,
  setBookmarkAction,
  setClearCreatedPost
} = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
