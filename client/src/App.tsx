import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
// import Header from './components/Header';

const queryClient = new QueryClient();
const S = {
  OutletWrapper: styled.div`
    max-width: 1264px;
    width: 100%;
    background: none;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  `,
};

function App() {
  return (
    <>
      {/* 헤더, 푸터 컴포넌트 생성시 주석처리 해제 및 import 필요. */}
      {/* <Header /> */}
      <QueryClientProvider client={queryClient}>
        <S.OutletWrapper>
          <Outlet />
        </S.OutletWrapper>
      </QueryClientProvider>
      {/* <Footer /> */}
    </>
  );
}

export default App;
