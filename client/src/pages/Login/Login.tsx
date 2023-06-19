import styled from 'styled-components';
import SocialButtons from '../../components/SocialButtons';
import logoIcon from '../../assets/logoIcon.png';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import { SOCIAL_LOGINS } from '../../constants/socialLogin';
import { USER_MESSAGES } from '../../constants/userMessages';

type Social = {
  label: string;
  onClick: () => void;
  platform: string;
};

export default function Login() {
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
    <S.Container>
      <S.Inner>
        <Link to="/">
          {' '}
          <S.Logo src={logoIcon} alt="Logo" />
        </Link>

        <SocialButtons socials={socialLogin} />
        <LoginForm />
      </S.Inner>
      <S.LinkBox>
        <div>
          {USER_MESSAGES.ACCOUNT}
          <Link to="user/register">{USER_MESSAGES.SIGNUP}</Link>
        </div>
      </S.LinkBox>
    </S.Container>
  );
}

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 56px);
    > div {
      margin-bottom: 1.6rem;
    }
  `,
  Inner: styled.div`
    width: 19rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Logo: styled.img`
    width: 32px;
    height: 37px;
  `,

  LinkBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;

    > div {
      font-size: var(--font-s);
      > a {
        color: var(--color-blue-200);
        margin-left: 6px;
        &:hover {
          color: var(--color-blue-100);
        }
      }
    }
  `,
};