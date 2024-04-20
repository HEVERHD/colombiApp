import { configureStore, createSlice } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';

const initialState = {
  sidebarShow: true,
  theme: 'light',
};

const changeStateSlice = createSlice({
  name: 'changeState',
  initialState,
  reducers: {
    set: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { set } = changeStateSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    changeState: changeStateSlice.reducer

  },
});
