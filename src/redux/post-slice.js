import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPost } from '../services/post';

export const fetchData = createAsyncThunk(
  'post/fetchData',
  async (id) => await fetchPost(id)
);

const initialState = {
  data: [],
  isLoading: false,
  error: null
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log(action);
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

export const postReducer = postSlice.reducer;
