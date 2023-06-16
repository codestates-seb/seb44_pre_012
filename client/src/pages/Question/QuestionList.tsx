import { styled } from 'styled-components';
import { data } from '../../temp/AllQuestionQuery.json';
import QuestionContent from './QuestionContent';
import { QuestionInfo } from '../../types/types';
import FilterButtons from './FilterButtons';
import Aside from './Aside';
import '../../index.css';
import { BiFilter } from 'react-icons/bi';
export default function QuestionList() {
  return (
    <S.Main>
      <div>
        <S.Title>
          <h1> All Questions </h1>
          <S.AskButton> Ask Question </S.AskButton>
        </S.Title>
        <S.SubTitle>
          <div> {data.length} questions</div>
          <S.FilterContainer>
            <FilterButtons />
            <S.Filter>
              <BiFilter size="21" />
              <span>Filter</span>
            </S.Filter>
          </S.FilterContainer>
        </S.SubTitle>
        <ul>
          {data.map((el: QuestionInfo) => (
            <QuestionContent key={el.questionId} data={el} />
          ))}
        </ul>
      </div>
      <Aside />
    </S.Main>
  );
}

const S = {
  Main: styled.main`
    border: 1px solid green;
    width: 100%;
    height: 100vh;
    display: flex;
    > div {
      border: 1px solid yellow;
      padding: 25px 24px;
    }
  `,

  Title: styled.div`
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

    color: #ffffff;
    border-radius: 3px;
    box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
    font-size: 13px;
  `,

  SubTitle: styled.section`
    /* border: 1px solid pink; */
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
    border: 1px solid var(--color-button-sky-hover);
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
  `,
};
