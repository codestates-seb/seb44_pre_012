import axios, { AxiosResponse } from 'axios';
// import { BASE_URL } from '../constants/apiUrl';
import { RegisterInfo } from '../types/types';

export async function registerUser(
  registerInfo: RegisterInfo
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(`/users/register`, {
      ...registerInfo,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
