import { styled } from 'styled-components';
import '../../index.css';

export default function FilterButtons() {
  return (
    <S.Container>
      <button>Newest</button>
      <button>Active</button>
      <button>
        Bountied <span>220</span>
      </button>
      <button>Unanswered</button>
      <button>More</button>
    </S.Container>
  );
}

const S = {
  Container: styled.aside`
  
    > button {
      border: 1px solid var(--color-layout-lightgray);
      padding: 9px;
      font-size: 12px;
      height: 35px;
      box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;

      &:first-child {
        border-radius: 3px 0px 0px 3px;
      }
      &:last-child {
        border-radius: 0px 3px 3px 0px;
      }
    }
  `,
};
