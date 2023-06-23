import { styled } from 'styled-components';
import CommonStyles from '../../style/CommonStyles';
import { Link } from 'react-router-dom';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { MdHowToVote } from 'react-icons/md';
import { AiFillTags } from 'react-icons/ai';
import { GiLaurelsTrophy } from 'react-icons/gi';

interface Benefit {
  icon: JSX.Element;
  description: string;
}

export default function RegisterBenefits(): JSX.Element {
  const benefits: Benefit[] = [
    {
      icon: <RiQuestionnaireFill size={26} />,
      description: 'Get unstuck — ask a question',
    },
    {
      icon: <MdHowToVote size={26} />,
      description: 'Unlock new privileges like voting and commenting',
    },
    {
      icon: <AiFillTags size={26} />,
      description:
        'Save your favorite questions, answers, watch tags, and more',
    },
    {
      icon: <GiLaurelsTrophy size={26} />,
      description: 'Earn reputation and badges',
    },
  ];
  return (
    <S.Container>
      <S.Title>Join the Stack Overflow community</S.Title>
      {benefits.map((el, idx) => {
        return (
          <S.Benefit key={idx}>
            <div>{el.icon}</div>
            <div>{el.description}</div>
          </S.Benefit>
        );
      })}
      <S.CaptionWrap>
        Collaborate and share knowledge with a private group for FREE.
        <br />
        <Link to="/">
          Get Stack Overflow for Teams free for up to 50 users.
        </Link>
      </S.CaptionWrap>
    </S.Container>
  );
}

const S = {
  ...CommonStyles,
  Title: styled.h1`
    margin-bottom: 2rem;
  `,
  Container: styled.div`
    margin-right: 3.2rem;
    color: var(--color-black);
  `,
  Benefit: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.6rem;
    > div:first-child {
      color: var(--color-blue-100);
      width: 26px;
      margin-right: 8px;

      > svg {
        width: 100%;
      }
    }
    > div:last-child {
      flex: 1;
    }
  `,
};
