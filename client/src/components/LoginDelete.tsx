import '../index.css';
import { styled } from 'styled-components';
import { QuestionAnswer } from '../types/types';
import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { questionsAPI } from '../api/QuestionListApi';

interface GuestDeleteProps {
  setIsDeleteClicked: React.Dispatch<React.SetStateAction<any>>; //
  item: QuestionAnswer;
  isLoggedIn: boolean;
  inputData: string;
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  isDeleteClicked: number;
  handleDelete: (e: React.FormEvent) => void;
  isCorrectEmail: boolean;
  setIsCorrectEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GuestDelete({
  setIsDeleteClicked,
  item,
  isLoggedIn,
  isDeleteClicked,
  inputData,
  setInputData,
  setIsCorrectEmail,
  isCorrectEmail,
}: // handleDelete,
GuestDeleteProps) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(() =>
    questionsAPI.deleteAnswerQuestion(1, isDeleteClicked)
  );
  const [isLayoutClicked, setIsLayoutClicked] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    console.log(
      `이메일 확인 기능이 구현되지 않았습니다. 대신 인풋 칸에 해당 답변의 Id인 -> ${isDeleteClicked} (을)를 입력해주세요.`
    );
    if (Number(inputData) === isDeleteClicked) {
      e.preventDefault();
      await mutateAsync();
      queryClient.invalidateQueries(['fetchCertainAnswer']);
      setIsDeleteClicked(0);
      console.log('삭제되었습니다');
      setInputData('');
      return;
    }
    e.preventDefault();
    // setIsDeleteClicked(0);
    console.log('이메일이 유효하지 않습니다.');
    setInputData('');
    setIsCorrectEmail(false);
    return;
  };

  return (
    <S.DeleteContainer>
      <S.DeleteButton
        onClick={() => {
          setIsDeleteClicked(item.questionAnswerId);
          setIsLayoutClicked(prev => !prev);
        }}
      >
        delete
      </S.DeleteButton>
      {isDeleteClicked === item.questionAnswerId && isLayoutClicked && (
        <div>
          <S.DeleteConfirmForm>
            {isCorrectEmail ? (
              <S.FormInform>
                Please enter the email address you used.
              </S.FormInform>
            ) : (
              <S.FormInform className="warning">
                The email does not match.
              </S.FormInform>
            )}
            <S.FormInput
              value={inputData}
              onChange={e => setInputData(e.target.value)}
              placeholder=" 아무 키나 입력 후 Submit을 누르고 콘솔창을 확인해주세요."
            />
            <S.ButtonBox>
              <S.FormCancelButton
                onClick={() => {
                  setIsDeleteClicked(0);
                  setIsCorrectEmail(true);
                  setInputData('');
                }}
              >
                Cancel
              </S.FormCancelButton>
              <S.FormSubmitButton onClick={handleDelete}>
                Submit
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
