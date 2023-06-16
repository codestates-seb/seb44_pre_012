import { styled } from 'styled-components';
import { QuestionInfo } from '../../types/types';
import '../../index.css';

interface QuestionContentProps {
  data : QuestionInfo;
}

export default function QuestionContent({ data }: QuestionContentProps) {
  const tempPostedTime: Date = new Date(data.createdAt);
  const now: Date = new Date();
  const elapsedMilliseconds:number = now.getTime() - tempPostedTime.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let formattedElapsedTime;
  switch (true) {
    case elapsedDays > 0:
      const formattedDate = `${
        monthNames[tempPostedTime.getMonth()]
      } ${tempPostedTime.getDate()}, ${tempPostedTime.getFullYear()}`;
      const formattedTime = `${tempPostedTime.getHours()}:${String(
        tempPostedTime.getMinutes()
      ).padStart(2, '0')}`;
      formattedElapsedTime = `${formattedDate} at ${formattedTime}`;
      break;
    case elapsedHours > 1:
      formattedElapsedTime = `${elapsedHours} hours ago`;
      break;
    case elapsedHours === 1:
      formattedElapsedTime = `${elapsedHours} hour ago`;
      break;
    case elapsedMinutes > 0:
      formattedElapsedTime = `${elapsedMinutes} minute(s) ago`;
      break;
    default:
      formattedElapsedTime = `${elapsedSeconds} seconds ago`;
      break;
  }

  return (
    <S.Li key={data.questionId}>
      <S.SubInfo>
        <div>{data.voteCount} votes</div>
        <div>0 answers</div>
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
            <span>이미지</span>
            <span>{data.userName}</span>
            <span>12</span>
            <span>asked {formattedElapsedTime}</span>
          </div>
        </S.BelowInfo>
      </S.Content>
    </S.Li>
  );
}

const S = {
  Li: styled.li`
    border-top: 0.5px solid var(--color-layout-lightgray);
    display: flex;
    padding: 16px;

    &:last-child {
      border-bottom: 0.5px solid var(--color-layout-lightgray);
    }
  `,

  Content: styled.article`
    /* border: 1px solid blue; */
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  SubInfo: styled.div`
    /* border: 1px solid yellow; */
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

    div:last-child {
      text-align: right;
      span {
        margin-left: 5px;
      }
      > span:nth-child(2) {
        color: var(--color-content-title);
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
  `,
};