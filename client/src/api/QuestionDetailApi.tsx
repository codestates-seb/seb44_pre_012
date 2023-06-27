import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';

export const questionDetailAPI = {

  fetchCertainQuestion: async (questionId: number|undefined|string) => {
    const res = await axios.get(`${BASE_URL}/questions/${questionId}`);
    const { data } = res.data;
    return data;
  },
};