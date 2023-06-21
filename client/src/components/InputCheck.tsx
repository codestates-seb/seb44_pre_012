import styled from 'styled-components';
import checkIcon from '../assets/checkIcon.svg';

type InputCheckProps = {
  id: string;
  label: string;
};

export default function InputCheck({
  id,
  label,
}: InputCheckProps): JSX.Element {
  return (
    <S.CheckWrap>
      <S.Check type={'checkbox'} id={id} />
      <S.Label htmlFor={id}>{label}</S.Label>
    </S.CheckWrap>
  );
}

const S = {
  CheckWrap: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
  `,
  Check: styled.input`
    width: 13px;
    height: 13px;
    cursor: pointer;
    outline: none;
    border: 1px solid hsl(210, 8%, 75%);
    border-radius: 3px;
    appearance: none;
    margin-right: 4px;

    &:focus {
      background-color: var(--color-blue-200);
      border-color: var(--color-blue-200);
      box-shadow: var(--check-fc-box-shadow);
    }

    &:checked {
      border-color: var(--color-blue-200);
      background-color: var(--color-blue-200);
      background-image: url(${checkIcon});
    }
  `,
  Label: styled.label`
    font-size: var(--font-xs);
    color: var(--color-label-black);
  `,
};
