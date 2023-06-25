import axios from 'axios';

export const questionDetailAPI = {

  fetchCertainQuestion: async (questionId: number|undefined|string) => {
    const res = await axios.get(`/questions/${questionId}`);
    const { questionData } = res.data;
    return questionData;
  },
};