import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      // { index: true, element: <QuestionList /> },
      // 주석 보고 추가해주세요.
      { path: 'users/login', element: <Login /> },
      // { path: 'users/register', element: <컴포넌트명 /> },
      // { path: 'users/:userId', element: <컴포넌트명 /> },

      // 전체 질문 조회 페이지 예시 /questions?size={size}&page={page}
      // { path: 'questions', element: <QuestionList /> },
      // { path: 'questions/register', element: <컴포넌트명 /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
