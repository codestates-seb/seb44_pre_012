import styled from 'styled-components';

type Props = {
  text: string;
  size?: string;
};

export default function FormSubmit({ text, size }: Props) {
  return <S.Button size={size}>{text}</S.Button>;
}

type ButtonProps = {
  size?: string;
};

const S = {
  Button: styled.button<ButtonProps>`
    width: ${props => (props.size === 'wide' ? '100%' : 'auto')};
    line-height: 1;
    margin: 2px;
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
