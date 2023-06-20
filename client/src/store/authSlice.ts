import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  login: {
    accessToken: string | null;
    refreshToken: string | null;
    memberId: number | null;
    isLogin: boolean;
  };
}

const initialState: AuthState = {
  login: {
    accessToken: null,
    refreshToken: null,
    memberId: null,
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
