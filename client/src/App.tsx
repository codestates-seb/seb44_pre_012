import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './components/Footer';

// 목업 서버 
import { worker } from "./temp/worker";
if (process.env.NODE_ENV === "development") {
  worker.start();
}

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  let bgColor;
  switch (location.pathname) {
    case '/users/logout':
    case '/users/login':
    case '/user/register':
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
      <QueryClientProvider client={queryClient}>
        <S.Container background={bgColor}>
          <S.OutletWrapper>
            <Outlet />
          </S.OutletWrapper>
        </S.Container>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Footer />
    </>
  );
}

export default App;

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
