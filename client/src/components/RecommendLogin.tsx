import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logoIcon.png';
import { SOCIAL_LOGINS } from '../constants/socialLogin';
import SocialButtons from './SocialButtons';
import '../index.css';

export default function RecommendLogin() {
  type Social = {
    label: string;
    onClick: () => void;
    platform: string;
  };
  const handleGoogleLogin = () => {};
  const handleGithubLogin = () => {};
  const handleFacebookLogin = () => {};
  const socialLogin: Social[] = SOCIAL_LOGINS.map(login => ({
    ...login,
    onClick:
      login.platform === 'google'
        ? handleGoogleLogin
        : login.platform === 'github'
        ? handleGithubLogin
        : handleFacebookLogin,
  }));

  return (
    <S.RecommendLoginContainer>
      <S.LoginGuestBox>
        <S.Title>
          Sign up or <a>log in</a>
        </S.Title>
        <SocialButtons socials={socialLogin} />
      </S.LoginGuestBox>
      <S.LoginGuestBox>
        <S.Title>Post as a guest</S.Title>
        <S.Label>
          <div className="name">Name </div>
          <input></input>
        </S.Label>
        <S.Label>
          <div className="email">Email</div>
          <div>Required, but never shown</div>
          <input></input>
        </S.Label>
      </S.LoginGuestBox>
    </S.RecommendLoginContainer>
  );
}

const S = {
  RecommendLoginContainer: styled.section`
    padding: 10px 7px;
    display: flex;
    justify-content: space-between;
    color: var(--color-page-title);
    @media (max-width: 600px) {
      flex-direction: column;
    }
  `,
  Title: styled.h4`
    font-size: 21px;
    font-weight: 500;
    margin-bottom: 5px;
    > a {
      color: var(--color-content-title);

      &:hover {
        color: var(--color-button-blue);
      }
    }
  `,
  LoginGuestBox: styled.div`
    width: 48%;
    display: flex;
    flex-direction: column;
    @media (max-width: 600px) {
      width: 100%;
    }
  `,

  Label: styled.label`
    color: #0c0d0e;
    font-weight: 600;
    .email,
    .name {
      margin-top: 5px;
    }
    > div:nth-child(2) {
      color: var(--color-content-desc);
      font-size: var(--font-xs);
      font-weight: 400;
    }
    > input {
      height: 32px;
      width: 100%;
      -webkit-border-radius: 0;
      border: 1.4px solid var(--color-ui-border);
      border-radius: 3px;
      &:focus {
        outline: 3.5px solid rgba(179, 211, 234, 0.5);
        -webkit-border-radius: 0;
        border-radius: 3px;
        border: 1px solid var(--color-button-blue);
      }
    }
  `,
};
