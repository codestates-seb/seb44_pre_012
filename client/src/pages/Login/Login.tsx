import styled from 'styled-components';
import SocialButtons from '../../components/SocialButtons';
import logoIcon from '../../assets/logoIcon.png';
import LoginForm from './LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { SOCIALS } from '../../constants/socials';
import { USER_MESSAGES } from '../../constants/userMessages';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import CommonStyles from '../../style/CommonStyles';

type Social = {
  label: string;
  onClick: () => void;
  platform: string;
};

export default function Login() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.login.isLogin
  );
  const handleGoogleLogin = () => {
    window.location.assign(`/oauth2/authorization/google`);
  };
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

  // 로그인시 메인 페이지로 이동
  // logout 페이지 생성까지 주석처리
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <S.UserContainer>
      <S.Inner>
        <Link to="/">
          {' '}
          <S.Logo src={logoIcon} alt="Logo" />
        </Link>

        <SocialButtons socials={socialLogin} />
        <LoginForm />
      </S.Inner>
      <S.UserLinkBox>
        <div>
          {USER_MESSAGES.ACCOUNT}
          <Link to="user/register">{USER_MESSAGES.SIGNUP}</Link>
        </div>
      </S.UserLinkBox>
    </S.UserContainer>
  );
}

const S = {
  ...CommonStyles,
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
};
