import { styled } from 'styled-components';
import { QuestionInfo } from '../../types/types';
import '../../index.css';
import colors from '../../constants/colorNames';
import { formatElapsedTime } from '../../util/formattedElapsedTime';
interface QuestionContentProps {
  data: QuestionInfo;
}

export default function QuestionContent({ data }: QuestionContentProps) {
  return (
    <S.Li key={data.questionId}>
      <S.SubInfo>
        <div>{data.voteCount} votes</div>
        <div>
          {data.answerCount === 1
            ? '1 answer'
            : `${data.answerCount} answers`}
        </div>
        <div>{data.viewCount} views</div>
      </S.SubInfo>
      <S.Content>
        <S.A>{data.questionTitle}</S.A>
        <S.Desc>{data.questionContent}</S.Desc>
        <S.BelowInfo>
          <div>
            {data.tag.map((item, index) => (
              <S.Tag key={index}>{item}</S.Tag>
            ))}
          </div>
          <div>
            <span>
              <S.UserImg>{data.userName.slice(0, 1).toUpperCase()}</S.UserImg>
            </span>
            <a>{data.userName}</a>
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
      }
      > span:nth-child(3) {
        font-weight: 500;
        color: #525960;
      }
    }
  `,

  A: styled.a`
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
    &:hover {
      background-color: var(--color-tag-skyblue-hover);
      color: var(--color-tag-blue-hover);
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
