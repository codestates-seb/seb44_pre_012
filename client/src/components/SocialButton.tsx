import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';

type Props = {
  onClick: () => void;
  children: string;
  platform: string;
};

function getIcon(platform: string): JSX.Element | null {
  switch (platform) {
    case 'google':
      return <FcGoogle />;
    case 'github':
      return <AiFillGithub color={'#FFF'} />;
    case 'facebook':
      return <FaFacebookSquare color={'#FFF'} />;
    default:
      return null;
  }
}

export default function SocialButton({ onClick, children, platform }: Props) {
  return (
    <S.Button onClick={onClick} platform={platform}>
      {platform && <S.IconContainer>{getIcon(platform)}</S.IconContainer>}
      {children}
    </S.Button>
  );
}

const S = {
  Button: styled.button<{ platform: string }>`
    width: 100%;
    height: 38px;
    background-color: ${props => {
      switch (props.platform) {
        case 'google':
          return 'hsl(0, 0%, 100%)';
        case 'github':
          return 'hsl(210, 8%, 20%)';
        case 'facebook':
          return 'hsl(223, 46%, 41%)';
        default:
          return 'hsl(0, 0%, 100%)';
      }
    }};
    color: ${props => {
      if (props.platform === 'google') {
        return 'hsl(210, 8%, 25%)';
      } else {
        return 'hsl(0, 0%, 100%)';
      }
    }};
    border: 1px solid hsl(210, 8%, 85%);
    border-radius: 5px;
    line-height: 1;
    padding: var(--pd-10);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-s);
    font-weight: 600;
    flex: 1;
    margin: 8px auto;

    &:hover {
      background-color: ${props => {
        switch (props.platform) {
          case 'google':
            return 'hsl(210,8%,97.5%);';
          case 'github':
            return 'hsl(210,8%,15%)';
          case 'facebook':
            return 'hsl(222, 46%, 36%)';
          default:
            return 'hsl(210,8%,97.5%)';
        }
      }};
    }

    &:focus {
      box-shadow: ${props => {
        if (props.platform === 'facebook') {
          return '0 0 0 4px hsla(206, 100%, 40%, 0.15)';
        } else {
          return '0 0 0 4px hsla(210, 8%, 15%, 0.1)';
        }
      }};
    }
  `,
  IconContainer: styled.div`
    width: 18px;
    height: 18px;
    margin-right: 8px;
    > * {
      width: 100%;
      height: 100%;
    }
  `,
};
