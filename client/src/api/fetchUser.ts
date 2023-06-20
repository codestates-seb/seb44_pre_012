// 유저 정보를 받아오는 함수

import axios from 'axios';
import { BASE_URL } from '../constants/apiUrl';

const fetchUser = async () => {
  const res = await axios.get(`${BASE_URL}/users/me`);
  return res.data;
};

export default fetchUser;
