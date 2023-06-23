import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SOCIALS } from '../constants/socials';
import SocialButtons from './SocialButtons';
import '../index.css';
interface RecommendLoginProps {
  nameData: string;
  setNameData: (name: string) => void;
  emailData: string;
  setEmailData: (name: string) => void;
  isValid: boolean;
  setIsValid: (name: boolean) => void;
}

export default function RecommendLogin({
  nameData,
  setNameData,
  emailData,
  setEmailData,
  isValid,
  setIsValid
}: RecommendLoginProps) {
  type Social = {
    label: string;
    onClick: () => void;
    platform: string;
  };
  const handleGoogleLogin = () => {};
  const handleGithubLogin = () => {};
  const handleFacebookLogin = () => {};
  const socialLogin: Social[] = SOCIALS.map(login => ({
    ...login,
    onClick:
      login.platform === 'google'
        ? handleGoogleLogin
        : login.platform === 'github'
        ? handleGithubLogin
        : handleFacebookLogin,
  }));

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameData(event.target.value);
  };

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailData(event.target.value);
  };



  return (
    <S.RecommendLoginContainer>
      <S.LoginGuestBox>
        <S.Title>
          Sign up or <Link to="/users/login">log in</Link>
        </S.Title>
        <SocialButtons socials={socialLogin} />
      </S.LoginGuestBox>
      <S.LoginGuestBox>
        <S.Title>Post as a guest</S.Title>
        <S.Label>
          <span className="name">Name </span>
          {!nameData ? (
            <S.WarningSpan>: Please enter your name</S.WarningSpan>
          ) : null}
          <input value={nameData} onChange={handleNameInputChange} />
        </S.Label>
        <S.Label>
          <span className="email">Email</span>
          {!emailData ? (
            <S.WarningSpan>: Please enter your email.</S.WarningSpan>
          ) : !isValid ? (
            <S.WarningSpan>This is not a proper email address</S.WarningSpan>
          ) : null}
          <div className="inform">Required, but never shown</div>
          <input value={emailData} onChange={handleEmailInputChange} />
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
      display: inline-block;
    }
    .inform {
      color: var(--color-content-desc);
      font-size: var(--font-xs);
      font-weight: 400;
    }
    > input {
      height: 32px;
      padding-left: 5px;
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
  WarningSpan: styled.span`
    margin-left: 5px;
    font-weight: 300;
    font-size: 13px;
    color: var(--input-err-border-color);
  `,
};
