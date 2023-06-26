import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import  questionReducer  from './questionReducer';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    questionReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
