import { styled } from 'styled-components';
import InputField from './InputField';
import FormSubmit from './FormSubmit';
import { USER_MESSAGES } from '../constants/userMessages';
import { PATHS } from '../constants/paths';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '../api/loginRequest';

interface LoginInfo {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleInputValue =
    (key: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo(prevState => ({ ...prevState, [key]: e.target.value }));
    };

  const loginMutation = useMutation(loginRequest, {
    onSuccess: data => {
      setEmailError('');
      setPasswordError('');
      dispatch(login(data.user));

      navigate(`/`);
    },
    onError: (err: any) => {
      const error = err.response.data;
      if (error.message.includes('invalid email')) {
        setEmailError('No user found with matching email.');
      } else if (error.message.includes('invalid password')) {
        setPasswordError('The email or password is incorrect.');
      } else {
        setEmailError('The email is not a valid email address.');
      }
    },
  });

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
    loginMutation.mutate(loginInfo);
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
};
