import { Link, useNavigate } from 'react-router-dom';
import FormSubmit from '../../components/FormSubmit';
import InputCheck from '../../components/InputCheck';
import InputField from '../../components/InputField';
import { USER_MESSAGES } from '../../constants/userMessages';
import CommonStyles from '../../style/CommonStyles';
import { styled } from 'styled-components';
import { useState } from 'react';
import { ERROR_MESSAGES } from '../../constants/errorMessage';
import { registerUser } from '../../api/registerRequest';

type RegisterInfoType = {
  displayName: string;
  email: string;
  password: string;
};

type ErrorType = {
  nameError: string;
  passwordError: string;
  emailError: string;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState<RegisterInfoType>({
    displayName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<ErrorType>({
    nameError: '',
    emailError: '',
    passwordError: '',
  });

  const handleInputValue =
    (key: 'displayName' | 'email' | 'password') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterInfo(prevState => ({ ...prevState, [key]: e.target.value }));
    };

  const registerRequestHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError({ nameError: '', emailError: '', passwordError: '' });

    // 유효성 검사
    let newErrorMessage: ErrorType = {
      nameError: '',
      emailError: '',
      passwordError: '',
    };

    /**
     * display name 검사 사항
     * display name이 비어있음
     * display name이 5글자 미만
     */
    if (!registerInfo.displayName || registerInfo.displayName.length < 5) {
      newErrorMessage = {
        ...newErrorMessage,
        nameError: registerInfo.displayName
          ? ERROR_MESSAGES.DISPLAY_NAME_NUMBER_ERROR
          : ERROR_MESSAGES.DISPLAYNAME_EMPTY,
      };
    }

    /**
     * email 검사사항
     * email format이 아님
     */
    const emailFormat = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!registerInfo.email || !emailFormat.test(registerInfo.email)) {
      newErrorMessage = {
        ...newErrorMessage,
        emailError: registerInfo.email
          ? `${registerInfo.email}${ERROR_MESSAGES.EMAIL_FORMAT_ERROR}`
          : ERROR_MESSAGES.EMAIL_EMPTY,
      };
    }

    /**
     * password 검사사항
     * 8글자 미만
     * 숫자, 문자, 특수문자가 각 1개씩은 있어야 함
     */
    const containsLetter = /[a-zA-Z]/.test(registerInfo.password);
    const containsNumber = /\d/.test(registerInfo.password);
    const containsSpecialChar = /[@$!%*#?&]/.test(registerInfo.password);

    if (
      !registerInfo.password ||
      registerInfo.password.length < 8 ||
      !containsLetter ||
      !containsNumber ||
      !containsSpecialChar
    ) {
      newErrorMessage = {
        ...newErrorMessage,
        passwordError: !registerInfo.password
          ? ERROR_MESSAGES.PASSWORD_EMPTY
          : registerInfo.password.length < 8
          ? `Must contain at least ${8 - registerInfo.password.length} more`
          : !containsLetter
          ? `${ERROR_MESSAGES.PASSWORD_ERROR_CONTAIN} letters`
          : !containsNumber
          ? `${ERROR_MESSAGES.PASSWORD_ERROR_CONTAIN} letters`
          : !containsSpecialChar
          ? `${ERROR_MESSAGES.PASSWORD_ERROR_CONTAIN} special symbol ( !, @, #, $, %, ^, &, *)`
          : '',
      };
    }
    if (
      newErrorMessage.nameError ||
      newErrorMessage.emailError ||
      newErrorMessage.passwordError
    ) {
      setError(newErrorMessage);
      return;
    }

    try {
      const response = await registerUser(
        registerInfo.displayName,
        registerInfo.email,
        registerInfo.password
      );
      console.log(response);
      navigate('/users/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.FormContainer>
      <S.Form onSubmit={registerRequestHandler}>
        <InputField
          type="text"
          label={USER_MESSAGES.DISPLAY_NAME}
          onChange={handleInputValue('displayName')}
          error={error.nameError}
        />
        <InputField
          type="email"
          label={USER_MESSAGES.EMAIL}
          onChange={handleInputValue('email')}
          error={error.emailError}
        />
        <InputField
          type="password"
          label={USER_MESSAGES.PASSWORD}
          onChange={handleInputValue('password')}
          caption={USER_MESSAGES.SIGNUP_PASSWORD_CAPTION}
          error={error.passwordError}
        />
        <S.Captcha />
        <InputCheck
          label={USER_MESSAGES.SIGNUP_CHECK_LABEL}
          id={USER_MESSAGES.SIGNUP_CHECK}
        />
        <S.FormButtonWrap>
          <FormSubmit text={USER_MESSAGES.SIGNUP} size="wide" />
        </S.FormButtonWrap>
        <S.CaptionWrap>
          By clicking “Sign up”, you agree to our{' '}
          <Link to="/">terms of service</Link> and acknowledge that you have
          read and understand our <Link to="/">privacy policy</Link> and{' '}
          <Link to="/">code of conduct.</Link>
        </S.CaptionWrap>
      </S.Form>
    </S.FormContainer>
  );
}

const S = {
  ...CommonStyles,
  Captcha: styled.div`
    width: 100%;
    background: rgb(227, 230, 232);
    border-radius: 3px;
    border: 1px solid rgb(227, 230, 232);
    padding: 8px;
    margin: 12px 0;
    height: 144px;
  `,
};
