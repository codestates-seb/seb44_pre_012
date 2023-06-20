import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillExclamationCircleFill } from 'react-icons/bs';

type Props = {
  type: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  link?: string;
  message?: string;
  error?: string;
};

export default function InputField({
  type,
  label,
  onChange,
  link,
  message,
  error,
}: Props) {
  return (
    <S.Container>
      <S.InputInfo>
        <S.Label htmlFor={label}>{label}</S.Label>
        <S.Link tabIndex={-1} to={`${link}`}>
          {message}
        </S.Link>
      </S.InputInfo>
      <S.InputWrap>
        <S.InputText id={label} type={type} onChange={onChange} error={error} />
        {error && (
          <S.ErrorIcon>
            <BsFillExclamationCircleFill />
          </S.ErrorIcon>
        )}
      </S.InputWrap>
      <S.Error>{error}</S.Error>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    margin: 6px auto;

    & + & {
      margin-top: 12px;
    }
  `,
  InputInfo: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  InputWrap: styled.div`
    position: relative;
  `,
  InputText: styled.input<{ error?: string }>`
    width: 100%;
    height: 34px;
    box-shadow: var(--input-border-radius);
    border: 1px solid
      ${props =>
        props.error
          ? 'var(--input-err-border-color)'
          : 'var(--input-border-color)'};
    padding: 0.7rem 0.6rem;
    border-radius: var(--input-border-radius);
    overflow: hidden;
    &:focus {
      border-color: ${props =>
        props.error
          ? 'var(--input-err-border-color)'
          : 'var(--input-fc-border-color)'};
      box-shadow: ${props =>
        props.error
          ? 'var(--input-fc-err-box-shadow)'
          : 'var(--input-fc-box-shadow)'};
      outline: 0;
    }
  `,
  Label: styled.label`
    color: var(--color-label-black);
    font-weight: 600;
    align-items: center;
  `,
  Link: styled(Link)`
    color: var(--color-blue-200);
    font-size: var(--font-xs);
    &:hover {
      color: var(--color-blue-100);
    }
  `,
  Error: styled.div`
    color: hsl(358, 62%, 52%);
    margin-top: 5px;
    font-size: var(--font-s);
  `,
  ErrorIcon: styled.div`
    position: absolute;
    top: 50%;
    right: 0.7em;
    transform: translatey(-50%);
    svg {
      color: hsl(358, 68%, 59%);
    }
  `,
};
