import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: '',
  isActive: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalAction: (state, action) => {
      state.url = action.payload;
    },
    setModalActive: (state) => {
      state.isActive = true;
    },
    setModalHidden: (state) => {
      state.isActive = false;
    }
  }
});

export const { setModalAction, setModalActive, setModalHidden } =
  modalSlice.actions;

export const modalReducer = modalSlice.reducer;
