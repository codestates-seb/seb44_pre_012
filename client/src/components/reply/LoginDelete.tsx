import '../../index.css';
import { styled } from 'styled-components';
import { QuestionAnswer } from '../../types/types';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questionsAPI } from '../../api/QuestionListApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
interface GuestDeleteProps {
  item: QuestionAnswer;
}

export default function GuestDelete({ item }: GuestDeleteProps) {
  const [numberDeleteClicked, setNumberIsDeleteClicked] = useState(0);
  const [inputData, setInputData] = useState('');
  const [isCorrectSentence, setIsCorrectSentence] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // const userName = useSelector(
  //   (state: RootState) => state.auth.login.userName);
  const userName = 'Mango';
  const isUserCreated = item.userName === userName;

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(() =>
    questionsAPI.deleteAnswerQuestion(1, numberDeleteClicked)
  );
  const [isLayoutClicked, setIsLayoutClicked] = useState(false);
  function handleEnterKey(this: HTMLInputElement, event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const button = document.getElementById("submitButton");
      if (button) {
        button.click();
      }
    }
  }
  useEffect(() => {
    if (inputRef.current) {
    inputRef.current.addEventListener("keypress", handleEnterKey )};
    return () => {
      if (inputRef.current) {
      inputRef.current.removeEventListener("keypress", handleEnterKey);}
    };
  }, [handleEnterKey]);
  const handleDelete = async (e: React.FormEvent) => {
    if (inputData === 'I Love Mango') {
      e.preventDefault();
      await mutateAsync();
      queryClient.invalidateQueries(['fetchCertainAnswer']);
      setNumberIsDeleteClicked(0);
      setInputData('');
      return;
    }
    e.preventDefault();
    setInputData('');
    setIsCorrectSentence(false);
    return;
  };

  return (
    <S.DeleteContainer>
      {isUserCreated && (
        <S.DeleteButton
          onClick={() => {
            setNumberIsDeleteClicked(item.questionAnswerId);
            setIsLayoutClicked(prev => !prev);
          }}
        >
          Delete
        </S.DeleteButton>
      )}
      {numberDeleteClicked === item.questionAnswerId && isLayoutClicked && (
        <div>
          <S.DeleteConfirmForm>
            {isCorrectSentence ? (
              <S.FormInform>
                To confirm, type "I Love Mango" in the box below
              </S.FormInform>
            ) : (
              <S.FormInform className="warning">
                The sentence you entered does not match.
              </S.FormInform>
            )}
            <S.FormInput
            ref={inputRef}
           
              value={inputData}
              onChange={e => setInputData(e.target.value)}
              placeholder="I Love Mango"
            />
            <S.ButtonBox>
              <S.FormCancelButton
                onClick={() => {
                  setNumberIsDeleteClicked(0);
                  setIsCorrectSentence(true);
                  setInputData('');
                }}
              >
                Cancel
              </S.FormCancelButton>
              <S.FormSubmitButton onClick={handleDelete} id="submitButton">
                Delete
              </S.FormSubmitButton>
            </S.ButtonBox>
          </S.DeleteConfirmForm>
          <S.Layout
            onClick={() => setIsLayoutClicked(prev => !prev)}
          ></S.Layout>
        </div>
      )}
    </S.DeleteContainer>
  );
}

const S = {
  Layout: styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    cursor: auto;
  `,
  DeleteButton: styled.button``,
  DeleteContainer: styled.div`
    position: relative;
    height: 21px;
  `,
  DeleteConfirmForm: styled.form`
    width: 313px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 2px 6px 0px, rgba(0, 0, 0, 0.09) 0px 3px 8px 0px;
    background-color: white;
    height: 130px;
    border: 1px solid var(--color-button-lightgray);
    position: absolute;
    top: 150%;
    left: -25%;
    margin-left: 10px;
    padding: 13px 5px;
    border-radius: 3px;
    display: flex;
    z-index: 10;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &:after {
      content: '';
      position: absolute;
      top: -5.2%;
      left: 4.2%;
      border: 7.7px solid transparent;
      border-top-width: 0;
      border-bottom-color: white;
    }
    &:before {
      content: '';
      position: absolute;
      top: -7.2%;
      left: 3.7%;
      border: 9px solid transparent;
      border-top-width: 0;
      border-bottom-color: #dadde1ac;
    }
  `,
  FormInform: styled.div`
    &.warning {
      color: var(--input-err-border-color);
    }
  `,
  FormInput: styled.input`
    height: 32px;
    padding-left: 5px;
    width: 100%;
    font-size: 12px;
    -webkit-border-radius: 0;
    border: 1.4px solid var(--color-ui-border);
    border-radius: 3px;
    &:focus {
      outline: 3.5px solid rgba(179, 211, 234, 0.5);
      -webkit-border-radius: 0;
      border-radius: 3px;
      border: 1px solid var(--color-button-blue);
    }
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 45%;
  `,
  FormCancelButton: styled.button`
    padding: 5px;
    border-radius: 3px;
    border: 1px solid var(--color-button-orange-hover);
    background: var(--color-button-white);
    color: var(--color-layout-orange);
    &:hover {
      background: var(--color-aside-lightyellow);
    }
  `,
  FormSubmitButton: styled.button`
    padding: 5px;
    border-radius: 3px;
    background: var(--color-button-blue);
    border: 1px solid var(--color-button-blue);
    font-weight: 500;
    color: #ffffff;
    border-radius: 3px;
    box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
    &:hover {
      background: var(--color-content-title);
    }
  `,
};
