import { styled } from 'styled-components';
import InputField from './InputField';
import FormSubmit from './FormSubmit';
import { USER_MESSAGES } from '../constants/userMessages';

export default function LoginForm() {
  return (
    <S.LoginForm>
      <S.Form>
        <InputField type="email" label={USER_MESSAGES.EMAIL} />
        <InputField
          type="password"
          label={USER_MESSAGES.PASSWORD}
          link="/user/login"
          message={USER_MESSAGES.FORGOT_PASSWORD}
        />
        <FormSubmit text={USER_MESSAGES.LOGIN} />
      </S.Form>
    </S.LoginForm>
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
