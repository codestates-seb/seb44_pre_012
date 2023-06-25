import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Login from './pages/Login/Login';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import QuestionList from './pages/Question/QuestionList';
import Logout from './pages/Logout/Logout';
import Reply from './components/reply/Reply';
import Register from './pages/Register/Register';
import EmptyPage from './components/EmptyPage';
import QuestionDetail from './pages/QuestionDetail/QuestionDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <QuestionList /> },
      // { index: true, element: <QuestionList /> },
      // 주석 보고 추가해주세요.
      { path: 'users/login', element: <Login /> },
      { path: 'users/logout', element: <Logout /> },
      { path: 'users/register', element: <Register /> },
      // { path: 'users/:userId', element: <컴포넌트명 /> },

      // 전체 질문 조회 페이지 예시 /questions?size={size}&page={page}
      { path: 'questions', element: <QuestionList /> },
      { path: 'questions/:questionId', element: <QuestionDetail /> },
      { path: 'reply', element: <Reply /> },
      // { path: 'questions/register', element: <컴포넌트명 /> },

      // 빈 페이지
      { path: 'users', element: <EmptyPage /> },
      { path: 'collectives', element: <EmptyPage /> },
      { path: 'companies', element: <EmptyPage /> },
      { path: 'team', element: <EmptyPage /> },
      { path: 'tags', element: <EmptyPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
