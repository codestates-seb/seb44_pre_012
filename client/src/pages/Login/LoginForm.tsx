import InputField from '../../components/InputField';
import FormSubmit from '../../components/FormSubmit';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { USER_MESSAGES } from '../../constants/userMessages';
import { PATHS } from '../../constants/paths';
import { ERROR_MESSAGES } from '../../constants/errorMessage';
import { AxiosResponse } from 'axios';
import { loginRequest } from '../../api/loginRequest';
import CommonStyles from '../../style/CommonStyles';

type LoginInfoType = {
  email: string;
  password: string;
};

type ErrorType = {
  emailError: string;
  passwordError: string;
  loginError: string;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<ErrorType>({
    emailError: '',
    passwordError: '',
    loginError: '',
  });

  const handleInputValue =
    (key: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo(prevState => ({ ...prevState, [key]: e.target.value }));
    };

  const loginRequestHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 에러 상태 초기화
    setError({
      emailError: '',
      passwordError: '',
      loginError: '',
    });

    let newErrorMessages: ErrorType = {
      emailError: '',
      passwordError: '',
      loginError: '',
    };

    if (!loginInfo.email) {
      newErrorMessages = {
        ...newErrorMessages,
        emailError: ERROR_MESSAGES.EMAIL_EMPTY,
      };
    }

    if (!loginInfo.password) {
      newErrorMessages = {
        ...newErrorMessages,
        passwordError: ERROR_MESSAGES.PASSWORD_EMPTY,
      };
    }

    if (newErrorMessages.emailError || newErrorMessages.passwordError) {
      setError(newErrorMessages);
      return;
    }

    return loginRequest(loginInfo)
      .then((res: AxiosResponse<any>) => {
        if (res.status === 200) {
          const accessToken = res.headers['authorization'];
          const refreshToken = res.headers['refresh'];
          const memberId = res.data.id;
          // 로컬 스토리지에 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('memberId', memberId);

          setError(prevError => ({
            ...prevError,
            emailError: '',
            passwordError: '',
          }));

          dispatch(
            login({ accessToken, memberId, isLogin: true, refreshToken })
          );

          setLoginInfo({
            email: '',
            password: '',
          });

          navigate(`/`);
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          const error = err.response.data;
          if (error?.errorMessage === 'INVALID_EMAIL') {
            setError(prev => ({
              ...prev,
              emailError: ERROR_MESSAGES.INVALID_EMAIL,
              loginError: ERROR_MESSAGES.LOGIN_ERROR,
            }));
          } else if (error?.errorMessage === 'INVALID_PASSWORD') {
            setError(prev => ({
              ...prev,
              emailError: ERROR_MESSAGES.INVALID_PASSWORD,
              passwordError: ERROR_MESSAGES.INVALID_PASSWORD,
            }));
          } else {
            return;
          }
        }
      });
  };
  return (
    <>
      <S.FormContainer>
        <S.Form onSubmit={loginRequestHandler}>
          <InputField
            type="email"
            label={USER_MESSAGES.EMAIL}
            onChange={handleInputValue('email')}
            error={error.emailError}
          />

          <InputField
            type="password"
            label={USER_MESSAGES.PASSWORD}
            link={PATHS.LOGIN}
            onChange={handleInputValue('password')}
            message={USER_MESSAGES.ACCOUNT}
            error={error.passwordError}
          />
          <S.ButtonWrap>
            <FormSubmit size="wide" text={USER_MESSAGES.LOGIN} />
          </S.ButtonWrap>
        </S.Form>
        {error.loginError && (
          <S.ErrorMessage>{error.loginError}</S.ErrorMessage>
        )}
      </S.FormContainer>
      {/* 로그인 여부 테스트 문구. 추후 삭제할 것. */}
    </>
  );
}

const S = {
  ...CommonStyles,
  ErrorMessage: styled.p`
    color: hsl(358, 62%, 52%);
    font-size: var(--font-xs);
  `,
  ButtonWrap: styled.div`
    display: flex;
    width: 100%;
    margin: 6px auto;
  `,
};