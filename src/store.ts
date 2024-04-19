import { configureStore, createSlice } from '@reduxjs/toolkit';
import { authSlice } from './store/auth/authSlice';

// Define el estado inicial
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

// Define un slice personalizado para manejar el cambio de estado
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

// Configura el store de Redux Toolkit
export const store = configureStore({
  reducer: {
    // Agrega el slice de autenticación al reducer
    auth: authSlice.reducer,
    // Agrega el slice de cambio de estado al reducer
    changeState: changeStateSlice.reducer

  },
});
