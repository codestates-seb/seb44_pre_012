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
export default questionReducer.reducer;

// 사용 예시
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// const QuestionListData = useSelector(
//   (state: RootState) => state.questionReducer);
//   console.log(QuestionListData)
