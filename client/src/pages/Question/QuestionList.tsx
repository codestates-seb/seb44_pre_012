import { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import QuestionContent from './QuestionContent';
import { QuestionInfo } from '../../types/types';
import FilterButtons from './FilterButtons';
import Aside from './Aside';
import '../../index.css';
import { BiFilter } from 'react-icons/bi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { questionsAPI } from '../../api/QuestionListApi';
import SkeletonContainer from '../../components/Skeleton';

export default function QuestionList() {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, error, hasNextPage } = useInfiniteQuery(
    ['questionList'],
    ({ pageParam = 0 }) => questionsAPI.fetchQuestions(4, pageParam),
    {
      getNextPageParam: lastPage => {
        return lastPage.pageInfo.page + 1 === lastPage.pageInfo.totalPages ? undefined : lastPage.pageInfo.page + 1;

      },
    }
  );

  const [questionData, setQuestionData] = useState<QuestionInfo[]>([]);
  const [originData, setOriginData] = useState<QuestionInfo[]>([]);

  useEffect(() => {
    const incomingData: QuestionInfo[] = [];
    data?.pages.forEach(page => {
      page.data.forEach((el: QuestionInfo) => {
        incomingData.push(el);
      });
    });
    setOriginData(incomingData);
    setQuestionData(incomingData);
  }, [data]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]); //

  const handleFilteredData = (filteredData: QuestionInfo[]) =>
    setQuestionData(filteredData);

  const addCommasToNumber = (number: number) => {
    const formattedNumber = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedNumber;
  };

  return (
    <S.Main>
      <S.Container>
        {status === 'loading' ? (
          <SkeletonContainer />
        ) : status === 'error' ? (
          <span>Error: {(error as Error).message}</span>
        ) : (
          <div>
            <S.Title>
              <h1> All Questions </h1>
              <S.AskButton> Ask Question </S.AskButton>
            </S.Title>
            <S.SubTitle>
              <div> {addCommasToNumber(questionData.length)} questions</div>
              <S.FilterContainer>
                <FilterButtons
                  data={originData}
                  handleFilteredData={handleFilteredData}
                />
                <S.Filter>
                  <BiFilter size="21" />
                  <span>Filter</span>
                </S.Filter>
              </S.FilterContainer>
            </S.SubTitle>
            <S.Ul>
              {questionData.map((el: QuestionInfo) => (
                <QuestionContent key={el.questionId} data={el} />
              ))}
            </S.Ul>
            <S.ScrollBox ref={ref}>
              <S.Scroll
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage}
              >
                {hasNextPage ? 'More' : 'Nothing more to load'}{' '}
              </S.Scroll>
            </S.ScrollBox>
          </div>
        )}
        <Aside />
      </S.Container>
    </S.Main>
  );
}

const S = {
  Main: styled.main`
    height: 100%;
  `,
  Container: styled.div`
    display: flex;
  `,

  Title: styled.div`
    padding: 25px 24px 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
    }
    > h1 {
      font-weight: 400;
      color: var(--color-page-title);
      @media (max-width: 400px) {
        margin-bottom: 15px;
      }
    }
  `,

  AskButton: styled.button`
    padding: 10.4px;
    height: 38px;
    background: var(--color-button-blue);
    border: 1px solid var(--color-button-blue);
    font-weight: 500;
    color: #ffffff;
    border-radius: 3px;
    box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
    font-size: 13px;
    &:hover {
      background: var(--color-content-title);
    }
  `,

  SubTitle: styled.section`
    padding: 3px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
    }
    > div {
      font-size: 17px;
      color: var(--color-page-title);
    }
  `,
  FilterContainer: styled.div`
    display: flex;
  `,
  Filter: styled.button`
    background: var(--color-button-sky);
    color: var(--color-tag-blue);
    border: 1px solid #97b6cc;
    padding: 9px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    height: 35px;
    margin-left: 16px;
    > span {
      margin-left: 3px;
    }
    &:hover {
      background: var(--color-button-sky-hover);
      color: var(--color-tag-blue-hover);
    }
    .active {
      background: var(--color-button-sky-hover);
      color: var(--color-button-sky-active);
    }
    @media (max-width: 650px) {
      display: none;
    }
  `,
  Ul: styled.ul`
    padding: 0 24px 0 0;
  `,
  ScrollBox: styled.div`
    height: 75px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Scroll: styled.button`
    padding: 5px;
    margin: 20px;
    border-radius: 3px;
    border: 1px solid #aab0b7;
    background: var(--color-button-white);
  `,
};
