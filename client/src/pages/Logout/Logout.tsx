import styled from 'styled-components';
import LogoutForm from './LogoutForm';
import CommonStyles from '../../style/CommonStyles';

export default function Logout() {
  return (
    <S.UserContainer>
      <div>
        <S.Title>
          Clicking “Log out” will log you out of the following <br /> domains on
          this device:
        </S.Title>
        <S.UserInner>
          <LogoutForm />
        </S.UserInner>
      </div>
    </S.UserContainer>
  );
}
const S = {
  ...CommonStyles,

  Title: styled.h2`
    color: var(--color-black);
    font-size: var(--font-xl);
    margin-bottom: 1.6rem;
    text-align: center;
    font-weight: 400;
  `,
};
