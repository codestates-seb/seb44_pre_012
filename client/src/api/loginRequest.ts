// 로그인 요청 함수

import axios from 'axios';

export async function loginRequest(loginInfo) {
  const response = await axios.post(
    'https://f8f2a07f-23cc-4893-b937-d54fcb607024.mock.pstmn.io/user/login',
    loginInfo
  );
  return response.data;
}
