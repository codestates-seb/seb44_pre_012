import { styled } from 'styled-components';
import LoginForm from '../components/LoginForm';

const S = {
  Container: styled.section`
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 56px);
  `,
};

export default function Login() {
  return (
    <S.Container>
      <LoginForm />
    </S.Container>
  );
}
