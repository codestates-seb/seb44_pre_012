import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';

export const registerUser = async (displayName, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      name: displayName,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
