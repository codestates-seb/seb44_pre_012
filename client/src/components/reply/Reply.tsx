import '../../index.css';
import { styled } from 'styled-components';
import parse from 'html-react-parser';
import colors from '../../constants/colorNames';
import { formatAnswerElapsedTime } from '../../util/formatElapsedTime';
import AddReply from './AddReply';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import { FaRegBookmark, FaHistory } from 'react-icons/fa';
import { QuestionAnswer, QuestionData } from '../../types/types';
import SocialShare from './Share';
import GuestDelete from './GuestDelete';
import LoginDelete from './LoginDelete';
import VoteCount from './VoteCount';

interface ReplyProps {
  questionData: QuestionData;
}

export default function Reply({ questionData }: ReplyProps) {
  // const { isLoggedIn } = useSelector(
  //   (state: RootState) => state.auth.login
  // );
  const isLoggedIn = true; // temp
  console.log('here');

  console.log(questionData);
  return (
    <S.ReplyContainer>
      <S.TotalAnswers>
        <div>
          {Array.isArray(questionData.questionAnswers)
            ? `${questionData.questionAnswers.length} answers`
            : null}
        </div>
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
      {questionData.questionAnswers
        ? questionData.questionAnswers.map((item: QuestionAnswer) => (
            <S.RenderedAnswers key={item.answerId}>
              <div>
                <div>
                  <S.Sidebar>
                    <VoteCount item={item} isLoggedIn={isLoggedIn} />
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
                  <div>{parse(item.answerContent)}</div>
                  <S.BottomContainer>
                    <S.SocialBox>
                      <SocialShare />
                      {!isLoggedIn ? (
                        <GuestDelete item={item} questionItem={questionData} />
                      ) : (
                        <LoginDelete item={item} questionItem={questionData} />
                      )}
                    </S.SocialBox>
                    <S.UserBox>
                      <div>
                        answered{' '}
                        {formatAnswerElapsedTime(item.createdAt.toString())}
                      </div>
                      <div>
                        <div>
                          <S.UserImg>
                            {Array.isArray(item.userName) &&
                              item.userName.slice(0, 1).toUpperCase()}
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
      <AddReply item={questionData} />
    </S.ReplyContainer>
  );
}
const getUserRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const S = {
  ReplyContainer: styled.section`
    padding-top: 25px;
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  TotalAnswers: styled.h3`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 25px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      border-top: 1px solid var(--color-layout-lightgray);
      padding: 30px 0px;
      width: 93.5%;
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
      font-size: 1.2rem;
      margin: 3px 0 7px 0;
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
