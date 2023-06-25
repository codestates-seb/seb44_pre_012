import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import { PATHS } from './constants/paths';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import { useEffect } from 'react';
import Footer from './components/Footer';
import Nav from './components/Nav';

// 목업 서버
import { worker } from './temp/worker';
if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const queryClient = new QueryClient();

// 하단 주석 실제 서버와 연결 후 주석 해제
// axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Oauth 로그인
  const searchParamsToken = new URLSearchParams(window.location.search);
  const oauthAccessToken = searchParamsToken.get('access_token');
  const oauthRefreshToken = searchParamsToken.get('refresh_token');
  const oauthUserrId = searchParamsToken.get('userId');
  const oauthUserEmail = searchParamsToken.get('email') || '';
  const oauthUserNameRaw = searchParamsToken.get('userName');
  const oauthUserName = oauthUserNameRaw
    ? decodeURIComponent(oauthUserNameRaw)
    : '';

  useEffect(() => {
    if (oauthAccessToken && oauthRefreshToken && oauthUserrId) {
      localStorage.setItem('accessToken', oauthAccessToken);
      localStorage.setItem('refreshToken', oauthRefreshToken);
      localStorage.setItem('userId', oauthUserrId);
      localStorage.setItem('userName', oauthUserName);
      localStorage.setItem('userEmail', oauthUserEmail);

      // 상태 저장
      dispatch(
        login({
          oauthAccessToken,
          oauthUserrId,
          oauthUserName,
          oauthUserEmail,
          isLogin: true,
        })
      );
      navigate('/');
    }
  }, [oauthAccessToken, oauthUserrId]);

  // 로그인 상태 유지
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (accessToken && userId && refreshToken) {
      dispatch(
        login({
          accessToken,
          userId,
          refreshToken,
          userName,
          userEmail,
          isLogin: true,
        })
      );
    }
  }, [dispatch]);

  let bgColor: string;
  let showNav: boolean = true;
  let showFooter: boolean = true;

  switch (location.pathname) {
    case PATHS.LOGIN:
    case PATHS.LOGOUT:
    case PATHS.REGISTER:
      bgColor = 'hsl(210, 8%, 95%)';
      showNav = false;
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
          {showNav && (
            <S.NavWrapper>
              <Nav />
            </S.NavWrapper>
          )}
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
    display: flex;
    flex: 1;
    min-height: 100%;
    background: ${props => props.background};
  `,
  OutletWrapper: styled.div`
    display: flex;
    flex: 1;
    max-width: 1264px;
    width: 100%;
    margin: 0 auto;
    min-height: 100%;
    > main {
      flex: 1;
    }
  `,
  NavWrapper: styled.aside`
    position: sticky;
    top: 52px;
    border-right: 1px solid hsl(210, 8%, 85%);
    width: 164px;
    max-height: calc(100vh - 52px);
  `,
};
