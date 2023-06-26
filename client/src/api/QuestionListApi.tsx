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
    // const res = await instance.get(`${BASE_URL}/questions?size=${size}&page=${pageParam}`);
    const res = await axios.get(`/questions?size=${size}&page=${pageParam}`);

    const { data } = res.data;
    const { pageInfo } = res.data;
    return { data, pageInfo };
  },
  fetchCertainQuestion: async (questionId: number) => {
    const res = await axios.get(`/questions/${questionId}`);
    const { data } = res.data;
    return data;
  },
  postAnswerQuestion: async (questionId: number, requestBody: AnswerData) => {
    try {
      const res = await axios.post(
        `/answers/register/${questionId}`,
        requestBody
      );
      const { data } = res.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteAnswerQuestion: async (questionId: number, answerId: number) => {
    try {
      await axios.delete(
        `/answers/?questionId=${questionId}&answerId=${answerId}`
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
