import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'en'
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguageAction: (state, action) => {
      console.log(state.value);
      state.value = action.payload;
    }
  }
});

export const { setLanguageAction } = languageSlice.actions;

export const languageReducer = languageSlice.reducer;
