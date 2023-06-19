import InputField from '../../components/InputField';
import FormSubmit from '../../components/FormSubmit';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { USER_MESSAGES } from '../../constants/userMessages';
import { PATHS } from '../../constants/paths';
import { ERROR_MESSAGES } from '../../constants/errorMessage';
import { AxiosResponse } from 'axios';
import { loginRequest } from '../../api/loginRequest';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.login.isLogin
  );
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const handleInputValue =
    (key: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo(prevState => ({ ...prevState, [key]: e.target.value }));
    };

  const loginRequestHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginInfo.email) {
      setEmailError('Email cannot be empty.');
      return;
    }

    if (!loginInfo.password) {
      setPasswordError('Password cannot be empty.');
      return;
    }

    return loginRequest(loginInfo)
      .then((res: AxiosResponse<any>) => {
        if (res.status === 200) {
          const accessToken = 'accesstoken';
          const refreshToken = 'refreshtoken';
          // const accessToken = res.headers['authorization'];
          // const refreshToken = res.headers['refresh'];
          const memberId = res.data.data.id;

          // 로컬 스토리지에 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('memberId', memberId);

          setEmailError('');
          setPasswordError('');
          dispatch(
            login({ accessToken, memberId, isLogin: true, refreshToken })
          );
          navigate(`/`);
        }
      })
      .catch(err => {
        if (err.status === 401) {
          const error = err.response.data;
          if (error?.errorMessage === 'INVALID_EMAIL') {
            setEmailError(ERROR_MESSAGES.INVALID_EMAIL);
            setLoginError(ERROR_MESSAGES.LOGIN_ERROR);
          } else if (error?.errorMessage === 'INVALID_PASSWORD') {
            setPasswordError(ERROR_MESSAGES.INVALID_PASSWORD);
          }
        } else {
          console.log('Error without response: ', err);
        }
      });
  };
  return (
    <>
      <S.LoginForm>
        <S.Form onSubmit={loginRequestHandler}>
          <InputField
            type="email"
            label={USER_MESSAGES.EMAIL}
            onChange={handleInputValue('email')}
            error={emailError}
          />

          <InputField
            type="password"
            label={USER_MESSAGES.PASSWORD}
            link={PATHS.LOGIN}
            onChange={handleInputValue('password')}
            message={USER_MESSAGES.ACCOUNT}
            error={passwordError}
          />
          <FormSubmit text={USER_MESSAGES.LOGIN} />
        </S.Form>
        {loginError && <S.ErrorMessage>{loginError}</S.ErrorMessage>}
      </S.LoginForm>
      {isLoggedIn ? <p>로그인 됐어잉</p> : <p>로그인 안됐어잉</p>}
    </>
  );
}

const S = {
  LoginForm: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 1.6rem;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05),
      0 1rem 2rem rgba(0, 0, 0, 0.05), 0 1rem 3rem rgba(0, 0, 0, 0.1);
  `,

  Form: styled.form`
    width: 100%;
  `,
  ErrorMessage: styled.p`
    color: hsl(358, 62%, 52%);
    font-size: var(--font-xs);
  `,
};
