import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchActivateUser,
  fetchAuthUser,
  fetchCreateUser,
  requestRefreshJwtToken
} from '../services/auth';
import { setAccessTokenCLient } from '../utils/client';
import { getJwtToken } from '../utils/getJwtToken';

export const fetchCreateUserThunk = createAsyncThunk(
  'auth/fetchCreateUserThunk',
  async (user, thunkAPI) => {
    const data = await fetchCreateUser(user);
    return data;
  }
);

export const fetchActivateUserThunk = createAsyncThunk(
  'auth/fetchActivateUserThunk',
  async (token, thunkAPI) => await fetchActivateUser(token)
);

export const fetchAuthUserThunk = createAsyncThunk(
  'auth/fetchAuthUserThunk',
  async (data, thunkAPI) => await fetchAuthUser(data)
);

export const fetchRefreshJwtToken = createAsyncThunk(
  'auth/fetchRefreshJwtToken',
  async (_, { getState }) => {
    const refreshToken = getState().auth.jwToken?.refresh;

    if (!refreshToken) return null;

    const response = await requestRefreshJwtToken({ refresh: refreshToken });
    const newJwtToken = {
      refresh: refreshToken,
      ...response
    };
    localStorage.setItem('JWTtoken', JSON.stringify(newJwtToken));
    return newJwtToken;
  }
);

const initialState = {
  currentUser: {},
  isActivate: false,
  jwToken: getJwtToken()
};

setAccessTokenCLient(initialState.jwToken?.access);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateUserThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.currentUser = action.payload;
    });
    builder.addCase(fetchCreateUserThunk.rejected, (state, action) => {
      console.log(action);
    });

    builder.addCase(fetchActivateUserThunk.fulfilled, (state) => {
      state.isActivate = true;
    });

    builder.addCase(fetchAuthUserThunk.fulfilled, (state, action) => {
      state.jwToken = action.payload;
      setAccessTokenCLient(action.payload?.access);
      localStorage.setItem('JWTtoken', JSON.stringify(action.payload));
    });
    builder.addCase(fetchRefreshJwtToken.fulfilled, (state, action) => {
      state.jwToken = action.payload;
      setAccessTokenCLient(action.payload?.access);
    });
  }
});

export const { checkLocalStorageJWT } = authSlice.actions;

export const authReducer = authSlice.reducer;
