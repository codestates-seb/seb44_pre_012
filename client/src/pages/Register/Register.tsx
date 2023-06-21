import { styled } from 'styled-components';
import SocialButtons from '../../components/SocialButtons';
import { SOCIALS } from '../../constants/socials';
import CommonStyles from '../../style/CommonStyles';
import RegisterForm from './RegisterForm';
import RegisterBenefits from './RegisterBenefits';

type Social = {
  label: string;
  onClick: () => void;
  platform: string;
};

export default function Register() {
  const handleGoogleLogin = () => {};
  const handleGithubLogin = () => {};
  const handleFacebookLogin = () => {};
  const socialRegister: Social[] = SOCIALS.map(el => ({
    ...el,
    onClick:
      el.platform === 'google'
        ? handleGoogleLogin
        : el.platform === 'github'
        ? handleGithubLogin
        : handleFacebookLogin,
  }));

  return (
    <S.UserContainer>
      <S.Wrapper>
        <RegisterBenefits />
        <S.Inner>
          <SocialButtons socials={socialRegister} />
          <RegisterForm />
        </S.Inner>
      </S.Wrapper>
    </S.UserContainer>
  );
}

const S = {
  ...CommonStyles,
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

  Wrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
