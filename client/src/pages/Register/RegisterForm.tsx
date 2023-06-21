import { Link } from 'react-router-dom';
import FormSubmit from '../../components/FormSubmit';
import InputCheck from '../../components/InputCheck';
import InputField from '../../components/InputField';
import { USER_MESSAGES } from '../../constants/userMessages';
import CommonStyles from '../../style/CommonStyles';
import { styled } from 'styled-components';

export default function RegisterForm() {
  return (
    <S.FormContainer>
      <S.Form>
        <InputField
          type="text"
          label={USER_MESSAGES.DISPLAY_NAME}
          onChange={() => {}}
        />
        <InputField
          type="email"
          label={USER_MESSAGES.EMAIL}
          onChange={() => {}}
        />
        <InputField
          type="password"
          label={USER_MESSAGES.PASSWORD}
          onChange={() => {}}
          caption={USER_MESSAGES.SIGNUP_PASSWORD_CAPTION}
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
