import { createSlice } from '@reduxjs/toolkit';

const storedData = localStorage.getItem('allQuestions');
const initialState = storedData ? JSON.parse(storedData) : null;

export const questionReducer = createSlice({
  name: 'questionReducer',
  initialState,
  reducers: {
    storedAllQuestionQuery: (state, action) => {
      const updatedState = [...action.payload];
      localStorage.setItem('allQuestions', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { storedAllQuestionQuery } = questionReducer.actions;
// export default questionReducer.reducer;


// const initialState = {
//   data: null,
//   status: 'idle',
//   error: null,
// };

// export const questionReducer = createSlice({
//   name: 'questionReducer',
//   initialState,
//   reducers: {
//     setData: (state, action) => {
//       state.data = action.payload;
//       localStorage.setItem('allQuestions', JSON.stringify(action.payload));
//     },
//     setStatus: (state, action) => {
//       state.status = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const { setData, setStatus, setError } = questionReducer.actions;
export default questionReducer.reducer;

// 사용 예시
// 리액트 쿼리로 데이터를 불러온 후 Redux 상태와 로컬 스토리지에 저장

