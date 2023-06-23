import '../index.css';
import { styled } from 'styled-components';
import parse from 'html-react-parser';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { questionsAPI } from '../api/QuestionListApi';
import colors from '../constants/colorNames';
import { formatAnswerElapsedTime } from '../util/formatElapsedTime';
import AddReply from './AddReply';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { FaRegBookmark, FaHistory } from 'react-icons/fa';
import { QuestionAnswer } from '../types/types';
// 유저 아이디 있어야 함.

export default function Reply() {
  const [isDeleteClicked, setIsDeleteClicked] = useState(0);
  const [inputData, setInputData] = useState('');
  const query = useQuery(['fetchCertainAnswer'], () =>
    questionsAPI.fetchCertainQuestion(1)
  );
  // const isLoggedIn = useSelector(
  //   (state: RootState) => state.auth.login.isLogin
  // );
  const isLoggedIn = true;
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(() =>
    questionsAPI.deleteAnswerQuestion(1, isDeleteClicked)
  );
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
    setIsDeleteClicked(0);
    console.log('이메일이 유효하지 않습니다.');
    setInputData('');
    return;
  };

  return (
    <S.ReplyContainer>
      <S.TotalAnswers>
        <div>{query.data ? `${query.data.length} answers` : null}</div>
        <div>
          <span>sorted by:</span>
          <select defaultValue="highestScore">
            <option value="highestScore">Highest score (default)</option>
            <option value="trending">Trending (recent votes count more)</option>
            <option value="modified">Date modified (newest first) </option>
            <option value="created">Date created (oldest first) </option>
          </select>
        </div>
      </S.TotalAnswers>
      {query.data
        ? query.data.map((item: QuestionAnswer) => (
            <S.RenderedAnswers key={item.questionAnswerId}>
              <div>
                <div>
                  <S.Sidebar>
                    <S.ArrowBox className={isLoggedIn ? '' : 'isNotLoggedIn'}>
                      <IoMdArrowDropup size={28} />
                    </S.ArrowBox>
                    <div>{item.voteCount}</div>
                    <S.ArrowBox className={isLoggedIn ? '' : 'isNotLoggedIn'}>
                      <IoMdArrowDropdown size={28} />
                    </S.ArrowBox>
                    <S.Icon>
                      <FaRegBookmark
                        style={{ color: 'var(--color-button-lightgray)' }}
                      />
                    </S.Icon>
                    <S.Icon>
                      <FaHistory
                        style={{ color: 'var(--color-button-lightgray)' }}
                      />
                    </S.Icon>
                  </S.Sidebar>
                </div>
                <S.MainBar>
                  <div>{parse(item.questionAnswerContent)}</div>
                  <S.BottomContainer>
                    <S.SocialBox>
                      <div>share</div>
                      {!isLoggedIn ? (
                        <div
                          onClick={() =>
                            setIsDeleteClicked(item.questionAnswerId)
                          }
                        >
                          delete
                        </div>
                      ) : (
                        <div
                          onClick={() =>
                            setIsDeleteClicked(item.questionAnswerId)
                          }
                        >
                          delete
                        </div>
                      )}
                      {!isLoggedIn &&
                        isDeleteClicked === item.questionAnswerId && (
                          <S.DeleteConfirmForm>
                            <S.FormInform>
                              Please enter the email address you used.
                            </S.FormInform>
                            <S.FormInput
                              onChange={e => setInputData(e.target.value)}
                              placeholder=" 아무 키나 입력 후 Submit을 누르고 콘솔창을 확인해주세요."
                            />
                            <S.ButtonBox>
                              <S.FormCancelButton
                                onClick={() => setIsDeleteClicked(0)}
                              >
                                Cancel
                              </S.FormCancelButton>
                              <S.FormSubmitButton onClick={handleDelete}>
                                Submit
                              </S.FormSubmitButton>
                            </S.ButtonBox>
                          </S.DeleteConfirmForm>
                        )}
                    </S.SocialBox>
                    <S.UserBox>
                      <div>
                        answered {formatAnswerElapsedTime(item.createdAt)}
                      </div>
                      <div>
                        <div>
                          <S.UserImg>
                            {item.userName.slice(0, 1).toUpperCase()}
                          </S.UserImg>
                        </div>
                        <span>{item.userName}</span>
                      </div>
                    </S.UserBox>
                  </S.BottomContainer>
                  {/* <div>댓글 컴포넌트 렌더링 자리</div> */}
                </S.MainBar>
              </div>
            </S.RenderedAnswers>
          ))
        : null}
      <AddReply />
    </S.ReplyContainer>
  );
}
const getUserRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const S = {
  ReplyContainer: styled.section`
    padding: 24px;
    width: 100%;
    height: 2000vh;
    display: flex;
    flex-direction: column;
    > div:first-child {
      border: 1px solid goldenrod;
      height: 24px;
    }
  `,
  TotalAnswers: styled.h3`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 45px;
    margin-bottom: 8px;
    div:first-child {
      @media (max-width: 600px) {
        display: none;
      }
    }
    span {
      font-size: var(--font-s);
      font-weight: 400;
      margin-right: 5px;
    }
    select {
      width: 250px;
      height: 30px;
      padding: 0 5px;
    }
  `,
  RenderedAnswers: styled.div`
    width: 100%;
    /* border: 1px solid yellow; */
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      border-top: 1px solid var(--color-layout-lightgray);
      padding: 20px 10px 10px 0;
      width: 90%;
      display: flex;
      > div:first-child {
        margin-right: 20px;
      }
    }
  `,
  Sidebar: styled.div`
    flex: 0.9;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    > div {
      margin-bottom: 11px;
    }
    > div:first-child {
      margin-bottom: 7px;
    }
    > div:nth-child(2) {
      color: var(--color-content-desc);
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 7px;
    }
  `,
  ArrowBox: styled.div`
    &.isNotLoggedIn {
      opacity: 0.4;
    }
    border: 1px solid var(--color-button-lightgray);
    color: var(--color-content-desc);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: var(--color-button-orange-hover);
    }
  `,
  Icon: styled.div`
    cursor: pointer;
  `,
  MainBar: styled.div`
    flex: 9;
    color: var(--color-page-title);
  `,
  BottomContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 10px 20px 0;
  `,
  SocialBox: styled.div`
    display: flex;
    font-size: var(--font-s);
    > div {
      margin-right: 5px;
      cursor: pointer;
      color: var(--color-button-gray);
      &:hover {
        color: var(--color-subInfo-lightgray);
      }
    }
  `,
  UserBox: styled.div`
    border: 1px solid var(--color-layout-lightgray);
    border-radius: 3px;
    padding: 4px 7px;
    font-size: 11px;
    height: 52px;
    div:nth-child(2) {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-top: 3px;
      > div {
        margin-right: 5px;
      }
      > span {
        color: var(--color-content-title);
        font-size: var(--font-s);
        &:hover {
          color: var(--color-button-blue);
        }
      }
    }
    @media (max-width: 800px) {
      display: none;
    }
  `,
  UserImg: styled.div`
    width: 16px;
    height: 16px;
    border-radius: 3px;
    background-color: ${getUserRandomColor};
    text-align: center;
    font-weight: 500;
    line-height: 16px;
    font-size: 8px;
    color: white;
  `,

  DeleteConfirmForm: styled.form`
    border: 1px solid var(--color-button-lightgray);
    width: 313px;
    height: 130px;
    margin-left: 10px;
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.1));
    padding: 10px 5px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `,
  FormInform: styled.div``,
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
