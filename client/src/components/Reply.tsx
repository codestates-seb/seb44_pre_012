import '../index.css';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { questionsAPI } from '../api/QuestionListApi';
import colors from '../constants/colorNames';
import { formatAnswerElapsedTime } from '../util/formatElapsedTime';
import AddReply from './AddReply';

import {
  IoMdArrowDropup,
  IoMdArrowDropdown,
  // IoBookmarkOutline,
} from 'react-icons/io';
import { FaRegBookmark, FaHistory } from 'react-icons/fa';
// 유저 아이디 있어야 함.
interface QuestionAnswer {
  questionAnswerId: number;
  questionAnswerContent: string;
  userId: number;
  userName: string;
  voteCount: number;
  createdAt: string;
  modifiedAt?: string;
}
export default function Reply() {
  const query = useQuery(['fetchCertainAnswer'], () =>
    questionsAPI.fetchCertainQuestion('1')
  );
  // console.log(query.data);

  return (
    <S.ReplyContainer>
      <S.TotalAnswers>
        <h4>{query.data ? `${query.data.length} answers` : null}</h4>
        <div>
          <span>sorted by:</span>
          <input />
        </div>
      </S.TotalAnswers>
      {query.data
        ? query.data.map((item: QuestionAnswer) => (
            <S.RenderedAnswers key={item.questionAnswerId}>
              <div>
                <div>
                  <S.Sidebar>
                    <S.ArrowBox>
                      <IoMdArrowDropup size={28} />
                    </S.ArrowBox>
                    <div>{item.voteCount}</div>
                    <S.ArrowBox>
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
                <S.Mainbar>
                  <div>{item.questionAnswerContent}</div>
                  <S.BottomContainer>
                    <S.SocialBox>
                      <div>share</div>
                      <div>follow</div>
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
                </S.Mainbar>
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
    border: 1px solid blue;
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
    h4{
      @media (max-width: 600px) {
      display: none;
    }
    }
    span {
      font-size: var(--font-s);
      font-weight: 400;
      margin-right: 5px;
    
    }
    input {
      width: 250px;
      height: 30px;
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
    border: 1px solid var(--color-button-lightgray);
    color: var(--color-content-desc);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
      background-color: var(--color-button-orange-hover);
    }
  `,
  Icon: styled.div`
    cursor: pointer;
  `,
  Mainbar: styled.div`
    flex: 9;
    color: var(--color-page-title);
    /* border: 1px solid gray; */
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
