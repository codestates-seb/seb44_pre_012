import { useState } from 'react';
import { styled } from 'styled-components';
import QuestionContent from './QuestionContent';
import { QuestionInfo } from '../../types/types';
import FilterButtons from './FilterButtons';
import Aside from './Aside';
import '../../index.css';
import { BiFilter } from 'react-icons/bi';
import { data } from '../../temp/AllQuestionQuery.json';

export default function QuestionList() {
  const RecentData = data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const [QuestionData, setQuestionData] = useState<QuestionInfo[]>(RecentData);

  const addCommasToNumber = (number: number) => {
    const formattedNumber = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedNumber;
  };

  const handleFilteredData = (filteredData: QuestionInfo[]) =>
    setQuestionData(filteredData);

  return (
    <S.Main>
      <div>
        <S.Title>
          <h1> All Questions </h1>
          <S.AskButton> Ask Question </S.AskButton>
        </S.Title>
        <S.SubTitle>
          <div> {addCommasToNumber(QuestionData.length)} questions</div>
          <S.FilterContainer>
            <FilterButtons
              data={data}
              handleFilteredData={handleFilteredData}
            />
            <S.Filter>
              <BiFilter size="21" />
              <span>Filter</span>
            </S.Filter>
          </S.FilterContainer>
        </S.SubTitle>
        <S.Ul>
          {QuestionData.map((el: QuestionInfo) => (
            <QuestionContent key={el.questionId} data={el} />
          ))}
        </S.Ul>
      </div>
      <Aside />
    </S.Main>
  );
}

const S = {
  Main: styled.main`
    display: flex;
    > div {
    }
  `,

  Title: styled.div`
    padding: 25px 24px 0 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    > h1 {
      font-weight: 400;
      color: var(--color-page-title);
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
  `,
  Ul: styled.ul`
    padding: 0 24px 0 0;
  `,
};
