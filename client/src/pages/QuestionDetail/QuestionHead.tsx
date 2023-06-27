import { styled } from 'styled-components';
// import { data } from '../../temp/questionQuery.json';
import QuestionDetailnfo from './QuestionDetailInfo';
import '../../index.css';
import { QuestionData } from '../../types/types';
import timeForToday from '../../components/dateFunction';
import { Link } from 'react-router-dom';

interface QuestionDataProps {
  questionData: QuestionData;
}

const QuestionHead = ({ questionData }: QuestionDataProps) => {
  return (
    <div>
      <S.TitleDiv>
        <S.Title>{questionData.questionTitle}</S.Title>
        <Link to="questions/ask">
          <S.AskDiv>
            <S.AskButton>Ask Question</S.AskButton>
          </S.AskDiv>
        </Link>
      </S.TitleDiv>
      <S.InfoContainer>
        <QuestionDetailnfo
          title={'Asked'}
          content={timeForToday(questionData.createdAt)}
        />
        {questionData.modifiedAt && (
          <QuestionDetailnfo
            title={'Modified'}
            content={timeForToday(questionData.modifiedAt)}
          />
        )}
        <QuestionDetailnfo
          title={'Viewed'}
          content={`${questionData.viewCount} times`}
        />
      </S.InfoContainer>
    </div>
  );
};

const S = {
  TitleDiv: styled.div`
    display: flex;
    flex: 1 auto;
    margin-bottom: 8px;
  `,
  Title: styled.h1`
    font-size: 1.8rem;
    color: #3b4045;
    line-height: 1.35;
    font-weight: 400;
    margin-top: -2px;
  `,
  AskDiv: styled.div`
    display: block;
    margin-left: 12px;
  `,
  AskButton: styled.button`
    padding: 10.4px;
    height: 38px;
    background: var(--color-button-blue);
    border: 1px solid var(--color-button-blue);
    font-weight: 500;
    color: #ffffff;
    border-radius: 3px;
    white-space: nowrap;
    box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
    font-size: 13px;
    &:hover {
      background: var(--color-content-title);
    }
  `,

  InfoContainer: styled.div`
    display: flex;
    border-bottom: 1px solid hsl(210, 8%, 90%);
    padding-bottom: 8px;
    margin-bottom: 16px;
  `,
  infoTitle: styled.span`
    color: #6a737c;
  `,
  infoText: styled.span`
    color: #232629;
  `,
};

export default QuestionHead;
