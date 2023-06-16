import styled from 'styled-components';

export default function FormSubmit({ text }) {
  return <S.Button>{text}</S.Button>;
}

const S = {
  Button: styled.button`
    width: 100%;
    margin: 6px auto;
    line-height: 1;
    font-weight: 600;
    box-shadow: var(--button-box-shadow);
    background: var(--color-blue-100);
    font-size: var(--font-s);
    color: var(--color-white);
    padding: var(--pd-10);
    border-radius: var(--input-border-radius);
    border: 1px solid rgba(0, 0, 0, 0);
    &:hover {
      background: var(--color-blue-200);
    }
    &:focus {
      box-shadow: var(--button-fc-box-shadow);
    }
  `,
};
