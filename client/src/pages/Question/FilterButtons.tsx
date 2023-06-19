import { styled } from 'styled-components';
import '../../index.css';
import { RiArrowDownSFill } from 'react-icons/ri';
import { QuestionInfo } from '../../types/types';

interface FilterButtonsProps {
  data: QuestionInfo[];
  handleFilteredData: (filteredData: QuestionInfo[]) => void;
}

export default function FilterButtons({
  data,
  handleFilteredData,
}: FilterButtonsProps) {
  const filterOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let filteredData;
    const title = event.currentTarget.title;
    switch (title) {
      case 'Newest':
        filteredData = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        handleFilteredData(filteredData);
        break;
      case 'Active':
        filteredData = data;
        handleFilteredData(filteredData);
        break;
      case 'Bountied':
        filteredData = data;
        handleFilteredData(filteredData);
        break;
      case 'Unanswered':
        filteredData = data.filter(item => !item.answerCount);
        handleFilteredData(filteredData);
        break;
      default:
        break;
    }
  };

  return (
    <S.Container>
      <button title="Newest" onClick={filterOnClick}>
        Newest
      </button>
      <button title="Active" onClick={filterOnClick}>
        Active
      </button>
      <button title="Bountied" onClick={filterOnClick}>
        Bountied <span>220</span>
      </button>
      <button title="Unanswered" onClick={filterOnClick}>
        Unanswered
      </button>
      <button>
        More <RiArrowDownSFill />
      </button>
    </S.Container>
  );
}

const S = {
  Container: styled.aside`
    display: flex;
    > button {
      border: 1px solid #aab0b7;
      background: var(--color-button-white);
      border-left: 1px;
      padding: 9px;
      font-size: 12px;
      height: 35px;
      color: var(--color-button-gray);
      box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
      font-weight: 400;
      span {
        background-color: var(--color-content-title);
        color: white;
        border-radius: 3px;
        padding: 1px 5px;
      }
      &:first-child {
        border-radius: 3px 0px 0px 3px;
        border: 1px solid #aab0b7;
      }
      &:last-child {
        border-radius: 0px 3px 3px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:hover {
        background: var(--color-button-white-hover);
      }
      .active {
        background: var(--color-layout-lightgray);
        color: var(--color-content-desc);
      }
    }
  `,
};
