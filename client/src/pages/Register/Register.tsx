import { styled } from 'styled-components';
import SocialButtons from '../../components/SocialButtons';
import { SOCIALS } from '../../constants/socials';
import CommonStyles from '../../style/CommonStyles';
import RegisterForm from './RegisterForm';
import RegisterBenefits from './RegisterBenefits';
import { USER_MESSAGES } from '../../constants/userMessages';
import { Link } from 'react-router-dom';

type Social = {
  label: string;
  onClick: () => void;
  platform: string;
};

export default function Register() {
  const handleGoogleSignUp = () => {};
  const handleGithubSignUp = () => {};
  const handleFacebookSignUp = () => {};
  const socialRegister: Social[] = SOCIALS.map(el => ({
    ...el,
    onClick:
      el.platform === 'google'
        ? handleGoogleSignUp
        : el.platform === 'github'
        ? handleGithubSignUp
        : handleFacebookSignUp,
  }));

  return (
    <S.UserContainer>
      <S.Wrapper>
        <RegisterBenefits />
        <S.Inner>
          <SocialButtons socials={socialRegister} />
          <RegisterForm />
          <S.UserLinkBox>
            <div>
              {USER_MESSAGES.ALREADY_ACCOUNT}
              <Link to="user/register">{USER_MESSAGES.SIGNUP}</Link>
            </div>
          </S.UserLinkBox>
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
