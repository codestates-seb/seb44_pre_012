import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import { PATHS } from './constants/paths';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { useEffect } from 'react';
import Footer from './components/Footer';

// 목업 서버
// import { worker } from './temp/worker';
// if (process.env.NODE_ENV === 'development') {
//   worker.start();
// }

const queryClient = new QueryClient();
// 하단 주석 실제 서버와 연결 후 주석 해제
// axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const memberId = localStorage.getItem('memberId');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && memberId && refreshToken) {
      dispatch(
        login({
          accessToken,
          memberId,
          isLogin: true,
          refreshToken,
        })
      );
    }
  }, [dispatch]);

  let bgColor: string;
  let showFooter: boolean = true;

  switch (location.pathname) {
    case PATHS.LOGIN:
    case PATHS.LOGOUT:
    case PATHS.REGISTER:
      bgColor = 'hsl(210, 8%, 95%)';
      showFooter = false;
      break;
    default:
      bgColor = 'hsl(0, 0%, 100%)';
      break;
  }
  return (
    <>
      <Header />
      <S.Container background={bgColor}>
        <S.OutletWrapper>
          <Outlet />
        </S.OutletWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
      </S.Container>
      {showFooter && <Footer />}
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
    min-height: 100%;
    background: ${props => props.background};
  `,
  OutletWrapper: styled.div`
    flex: 1;
    max-width: 1264px;
    width: 100%;
    margin: auto;
  `,
};
