import { styled } from 'styled-components';
import QuestionItem from './QuestionItem';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { questionDetailAPI } from '../../api/QuestionDetailApi';
import Aside from '../Question/Aside';
import EmptyPage from '../../components/EmptyPage';
import Reply from '../../components/reply/Reply';

const QuestionDetail = () => {
  const { questionId } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['getQuestionDetail', questionId],
    () => questionDetailAPI.fetchCertainQuestion(questionId)
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    <EmptyPage />;
  }

  if (data) {
    const questionData = data;
    return (
      <S.Container>
        <div>
          <section>
            <QuestionItem questionData={questionData} />
          </section>
          <section>
            <Reply questionData={questionData} />
          </section>
        </div>
        <S.AsideWrap>
          <Aside />
        </S.AsideWrap>
      </S.Container>
    );
  }
};

const S = {
  Container: styled.main`
    display: flex;
    > section {
      display: block;
      width: 100%;
    }
  `,
  AsideWrap: styled.div`
    margin: 0 0 15px 0;
  `,
};

export default QuestionDetail;
