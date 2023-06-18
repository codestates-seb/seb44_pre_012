import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PATHS } from './constants/paths';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import fetchUser from './api/fetchUser';
// import Header from './components/Header';

const queryClient = new QueryClient();
// 하단 주석 실제 서버와 연결 후 주석 해제
// axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { data: userData, error } = useQuery(['user'], fetchUser, {
    onError: () => {
      alert(`${error}가 발생하였습니다. 다시 시도 해주세요.`);
    },
    onSuccess: data => {
      dispatch(login(data));
    },
  });

  let bgColor;
  switch (location.pathname) {
    case PATHS.LOGIN:
    case PATHS.LOGOUT:
    case PATHS.REGISTER:
      bgColor = 'hsl(210, 8%, 95%)';
      break;
    default:
      bgColor = 'hsl(0, 0%, 100%)';
      break;
  }
  return (
    <>
      {/* 헤더, 푸터 컴포넌트 생성시 주석처리 해제 및 import 필요. */}
      {/* <Header /> */}
      <S.Container background={bgColor}>
        <S.OutletWrapper>
          <Outlet />
        </S.OutletWrapper>
      </S.Container>
      {/* <Footer /> */}
    </>
  );
}

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

const S = {
  Container: styled.div<{ background: string }>`
    background: ${props => props.background};
    min-height: 100vh;
  `,
  OutletWrapper: styled.div`
    flex: 1;
    max-width: 1264px;
    width: 100%;
    margin: auto;
  `,
};
