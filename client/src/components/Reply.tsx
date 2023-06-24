// 질문 컴포넌트에서 질문 아이디 받아와야함.

import '../index.css';
import { styled } from 'styled-components';
import parse from 'html-react-parser';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { questionsAPI } from '../api/QuestionListApi';
import colors from '../constants/colorNames';
import { formatAnswerElapsedTime } from '../util/formatElapsedTime';
import AddReply from './AddReply';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import { useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { FaRegBookmark, FaHistory } from 'react-icons/fa';
import { QuestionAnswer } from '../types/types';
import SocialShare from './Share';
import GuestDelete from './GuestDelete';
// 유저 아이디 있어야 함.

export default function Reply() {
  const [isDeleteClicked, setIsDeleteClicked] = useState(0);
  const [inputData, setInputData] = useState('');
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);
  const query = useQuery(['fetchCertainAnswer'], () =>
    questionsAPI.fetchCertainQuestion(1)
  );
  // const isLoggedIn = useSelector(
  //   (state: RootState) => state.auth.login.isLogin
  // );
  const isLoggedIn = false;
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
    // setIsDeleteClicked(0);
    console.log('이메일이 유효하지 않습니다.');
    setInputData('');
    setIsCorrectEmail(false);
    return;
  };

  console.log(typeof inputData);

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
                      <SocialShare />
                      {!isLoggedIn ? (
                        <GuestDelete
                          isLoggedIn={isLoggedIn}
                          isDeleteClicked={isDeleteClicked}
                          inputData={inputData}
                          setInputData={setInputData}
                          setIsDeleteClicked={setIsDeleteClicked}
                          handleDelete={handleDelete}
                          item={item}
                          isCorrectEmail={isCorrectEmail}
                          setIsCorrectEmail={setIsCorrectEmail}
                        />
                      ) : (
                        <div
                          onClick={() =>
                            setIsDeleteClicked(item.questionAnswerId)
                          }
                        >
                          delete
                        </div>
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
};
