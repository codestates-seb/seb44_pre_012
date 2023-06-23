import axios from 'axios';

export const questionDetailAPI = {

  fetchCertainQuestion: async (questionId: number) => {
    const res = await axios.get(`/questions/${questionId}`);
    const { data } = res.data;
    return data;
  },
};