import { styled } from 'styled-components';
import { QuestionInfo } from '../../types/types';
import '../../index.css';
import colors from '../../constants/colorNames';
import { formatElapsedTime } from '../../util/formatElapsedTime';
import { Link } from 'react-router-dom';
interface QuestionContentProps {
  data: QuestionInfo;
}

export default function QuestionContent({ data }: QuestionContentProps) {

  function generateRandomName() {
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Isabella'];
    const lastNames = [
      'Smith',
      'Johnson',
      'Brown',
      'Davis',
      'Miller',
      'Wilson',
    ];

    const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
    const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);

    const randomFirstName = firstNames[randomFirstNameIndex];
    const randomLastName = lastNames[randomLastNameIndex];

    const randomName = randomFirstName + ' ' + randomLastName;

    return randomName;
  }

  const userRandomName = generateRandomName();

  function generateRandomNumber() {
    const min = 0;
    const max = 20;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  const randomNumber = generateRandomNumber();
  const randomNumberTwo = generateRandomNumber();
  return (
    <S.Li key={data.questionId}>
      <S.SubInfo>
        <div>{generateRandomNumber()} votes</div>
        <S.AnswerCount className={randomNumber ? 'answer' : ''}>
          {randomNumber === 1 ? '1 answer' : `${randomNumber} answers`}
        </S.AnswerCount>
        <div>{generateRandomNumber()} views</div>
        <S.BountyCount className={randomNumberTwo? 'hasBounty' : ''}>
          {randomNumberTwo ? `+${randomNumberTwo}` : ''}{' '}
        </S.BountyCount>
      </S.SubInfo>
      <S.Content>
        <S.A to={`/questions/${data.questionId}`}>{data.questionTitle}</S.A>
        <S.Desc>{data.questionContent}</S.Desc>
        <S.BelowInfo>
          <div>
            {data?.tag &&
              data.tag.map((item, index) => <S.Tag key={index}>{item}</S.Tag>)}
          </div>
          <div>
            <span>
              <S.UserImg>{ userRandomName.slice(0, 1).toUpperCase()}</S.UserImg>
            </span>
            <a>{userRandomName}</a>
            <span>12</span>
            <span>asked {formatElapsedTime(data.createdAt)}</span>
          </div>
        </S.BelowInfo>
      </S.Content>
    </S.Li>
  );
}

const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const S = {
  Li: styled.li`
    border-top: 0.5px solid var(--color-layout-lightgray);
    display: flex;
    padding: 16px;
    width: 100%;
    &:last-child {
      border-bottom: 0.5px solid var(--color-layout-lightgray);
    }
  `,

  Content: styled.article`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  SubInfo: styled.div`
    width: 100px;
    padding: 3px 0;
    text-align: right;
    color: var(--color-subInfo-lightgray);
    margin-right: 16px;
    font-size: 13px;
    div {
      margin-bottom: 7px;
    }
    div:first-child {
      color: var(--color-content-desc);
    }
  `,
  AnswerCount: styled.span`
    display: inline-block;
    margin-bottom: 7px;
    padding: 1px 3px;
    font-weight: 500;
    &.answer {
      border: 1px solid #2f6f44;
      color: #2f6f44;
      border-radius: 3px;
    }
    &.chose {
      background: #2f6f44;
      color: white;
      border-radius: 3px;
    }
  `,
  BountyCount: styled.span`
    &.hasBounty {
      color: white;
      background: #0074cc;
      border-radius: 3px;
      padding: 3px 3px;
      font-weight: 500;
    }
  `,
  BelowInfo: styled.div`
    text-align: left;
    font-size: 12px;
    display: flex;
    justify-content: space-between;

    > div:last-child {
      display: flex;
      align-items: center;
      text-align: right;

      span {
        margin-left: 5px;
      }
      > a {
        margin-left: 5px;
        color: var(--color-content-title);
        &:hover {
          color: var(--color-button-blue);
        }
        @media (max-width: 800px) {
          display: none;
        }
      }
      > span:nth-child(3) {
        font-weight: 500;
        color: #525960;
      }
    }
  `,

  A: styled(Link)`
    color: var(--color-content-title);
    font-size: 17px;
    margin-bottom: 2px;
    font-weight: 500;
    &:hover {
      color: var(--color-button-blue);
    }
  `,

  Desc: styled.div`
    color: var(--color-content-desc);
    font-size: 13px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 8px;
  `,

  Tag: styled.button`
    border-radius: 3px;
    padding: 4px 6px;
    background-color: var(--color-button-sky);
    color: var(--color-tag-blue);
    margin-right: 6px;
    margin-bottom: 4px;
    &:hover {
      background-color: var(--color-tag-skyblue-hover);
      color: var(--color-tag-blue-hover);
    }
    @media (max-width: 800px) {
      display: none;
    }
  `,
  UserImg: styled.div`
    width: 16px;
    height: 16px;
    border-radius: 3px;
    background-color: ${getRandomColor};
    text-align: center;
    font-weight: 500;
    line-height: 16px;
    font-size: 8px;
    color: white;
  `,
};
