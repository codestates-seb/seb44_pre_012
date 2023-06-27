import axios from 'axios';
import instance from './instance';
import { BASE_URL } from '../constants/apiUrl';
interface AnswerData {
  questionAnswerContent: string | undefined;
  userName: string | undefined;
  createdAt: string | object | undefined;
  answerId?: number | undefined;
}

export const questionsAPI = {
  fetchQuestions: async (size: number, pageParam: number) => {
    const res = await axios.get(`${BASE_URL}/questions?page=${pageParam}&size=${size}`);
    // const res = await axios.get(`/questions?size=${size}&page=${pageParam}`);

    const { data } = res.data;
    const { pageInfo } = res.data;
    return { data, pageInfo };
  },
  fetchCertainQuestion: async (questionId: number) => {
    const res = await axios.get(`${BASE_URL}/questions/${questionId}`);
    const { data } = res.data;
    return data;
  },
  postAnswerQuestion: async (questionId: number, requestBody: AnswerData) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/answers/register/${questionId}`,
        JSON.stringify(requestBody),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { data } = res.data;
      // console.log(res);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteAnswerQuestion: async (answerId: number) => {
    try {
      await axios.delete(
        // `${BASE_URL}/answers/?questionId=${questionId}&answerId=${answerId}`
        `${BASE_URL}/answers/${answerId}`
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
