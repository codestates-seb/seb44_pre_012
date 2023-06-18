// 유저 정보를 받아오는 함수

import axios from 'axios';

const fetchUser = async () => {
  const res = await axios.get(
    'https://f8f2a07f-23cc-4893-b937-d54fcb607024.mock.pstmn.io/users/me'
  );
  return res.data;
};

export default fetchUser;
