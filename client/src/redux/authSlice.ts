import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  login: {
    accessToken: string | null;
    refreshToken: string | null;
    userId: number | null;
    userName: string | null;
    userEmail: string | null;
    isLogin: boolean;
  };
}

const initialState: AuthState = {
  login: {
    accessToken: null,
    refreshToken: null,
    userId: null,
    userName: null,
    userEmail: null,
    isLogin: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = action.payload;
    },
    logout: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
