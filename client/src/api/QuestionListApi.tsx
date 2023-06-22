import axios from 'axios';

export const questionsAPI = {
  fetchQuestions: async (size: number, pageParam: number) => {
    const res = await axios.get(`/questions?size=${size}&page=${pageParam}`);
    const { data } = res.data;
    const { pageInfo } = res.data;
    return { data, pageInfo };
  },
  fetchCertainQuestion: async (questionId: string) => {
    const res = await axios.get(`/questions/${questionId}`);
    const { data } = res.data;
    // console.log(data)
    return data;
  },
};
