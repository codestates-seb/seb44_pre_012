import SocialButton from '../components/SocialButton';
import styled from 'styled-components';

type Social = {
  label: string;
  onClick: () => void;
  platform: string;
};

type SocialButtonsProps = {
  socials: Social[];
};

export default function SocialButtons({ socials }: SocialButtonsProps) {
  return (
    <S.Socials>
      {socials.map(social => (
        <SocialButton
          key={social.platform}
          onClick={social.onClick}
          platform={social.platform}
        >
          {social.label}
        </SocialButton>
      ))}
    </S.Socials>
  );
}

const S = {
  Socials: styled.div`
    margin-bottom: 1rem;
    width: 100%;
  `,
};
