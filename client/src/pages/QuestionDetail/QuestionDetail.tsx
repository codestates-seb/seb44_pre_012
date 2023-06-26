import { styled } from 'styled-components';
import QuestionItem from './QuestionItem';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { questionDetailAPI } from '../../api/QuestionDetailApi';

import EmptyPage from '../../components/EmptyPage';

const QuestionDetail = () => {
  const { questionId } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['getQuestionDetail', questionId],
    () => questionDetailAPI.fetchCertainQuestion(questionId)
  );

  // console.log(data[0])
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    <EmptyPage />;
  }

  if (data[0]) {
    const questionData = data[0];
    return (
      <S.Container>
        <section>
          <QuestionItem questionData={questionData} />
        </section>
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
};

export default QuestionDetail;
