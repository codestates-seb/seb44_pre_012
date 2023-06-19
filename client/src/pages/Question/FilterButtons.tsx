import { styled } from 'styled-components';
import '../../index.css';
import { RiArrowDownSFill } from 'react-icons/ri';

export default function FilterButtons() {
  return (
    <S.Container>
      <button>Newest</button>
      <button>Active</button>
      <button>
        Bountied <span>220</span>
      </button>
      <button>Unanswered</button>
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
