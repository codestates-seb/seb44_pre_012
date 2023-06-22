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
import Reply from './components/Reply';

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
      // { path: 'users/register', element: <컴포넌트명 /> },
      // { path: 'users/:userId', element: <컴포넌트명 /> },

      // 전체 질문 조회 페이지 예시 /questions?size={size}&page={page}
      { path: 'questions', element: <QuestionList /> },
      { path: 'reply', element: <Reply /> },
      // { path: 'questions/register', element: <컴포넌트명 /> },
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
