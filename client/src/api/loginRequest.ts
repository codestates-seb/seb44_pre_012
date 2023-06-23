// 로그인 요청 함수

import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants/apiUrl';
import { LoginInfo } from '../types/types';

export async function loginRequest(
  loginInfo: LoginInfo
): Promise<AxiosResponse> {
  const response = await axios.post(`${BASE_URL}/users/login`, loginInfo, {
    withCredentials: false,
  });
  return response;
}
