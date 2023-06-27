import { styled } from 'styled-components';
import askquestionbackgroundimg from '../../assets/askquestionbackgroundimg.svg';
import { useState, useRef } from 'react';
import { TfiPencil } from 'react-icons/tfi';
import { TbBellRinging2Filled } from 'react-icons/tb';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../../constants/apiUrl';
// import { BASE_URL } from "../../constants/apiUrl";

export interface QuestionPost {
  questionContents: object;
  // createdAt: Date | string;
  userName: string;
}

interface IsFocusProps {
  isFocus: boolean;
}

interface QuestionSidebarProps {
  title: string;
  text: string[];
}

type InputValue = {
  title?: string | undefined;
  content?: string | undefined;
  expection?: string | undefined;
  tag?: string[] | undefined;
};

export default function Askquestion() {
  // const isLoggedIn = useSelector(
  //   (state: RootState) => state.auth.login.isLogin
  // ); //이거 같이 넣어주기
  const editorRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState<InputValue>({
    title: '',
    content: '',
    expection: '',
    tag: ['Javascript'],
  });

  const questionsAPI = {
    postAskQuestion: async (requestBody: InputValue) => {
      try {
        const res = await axios.post(
          `${BASE_URL}/questions/register`,
          JSON.stringify(requestBody),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const { data } = res.data;
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };

  // const createdAt = new Date(); //글을 생성한 날짜 넣어주기

  const requestBody = {
    questionContent: inputValue.content,
    questionTitle: inputValue.title,
  };

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(() =>
    questionsAPI.postAskQuestion(requestBody)
  );

  const handleSubmit = async (e: React.MouseEvent) => {
    const res = await mutateAsync();
    setInputValue(prevState => ({
      ...prevState,
      title: '',
      content: '',
      expectation: '',
    }));
    queryClient.invalidateQueries(['fetchQuestions']);
    const questionId = res.questionId; 
    window.location.href = `/question/${questionId}`;
  };

  const handleNextStep = () => {
    //버튼의 타입에 Teaxtar라면 인풋의 벨류값이 20글자가 넘으면 작동
    setCurrentStep(prevStep => prevStep + 1);
    setIsFocus(true);
  };

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(prevState => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleInputContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(prevState => ({
      ...prevState,
      content: e.target.value,
    }));
  };

  const handleInputExpection = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(prevState => ({
      ...prevState,
      expection: e.target.value,
    }));
  };

  const handleInputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(prevState => ({
      ...prevState,
      tag: e.target.value.split(''),
    }));
  };

  const stepsList = [
    { description: 'Summarize your problem in a one-line title.' },
    { description: 'Describe your problem in more detail.' },
    { description: 'Describe what you tried and what you expected to happen.' },
    {
      description:
        'Add “tags” which help surface your question to members of the community.',
    },
    { description: 'Review your question and post it to the site.' },
  ];
  return (
    <S.AskQuestionPage>
      <S.QuestionNotice>
        <h1>Ask a public question</h1>
        <img src={askquestionbackgroundimg} alt="Ask question background" />
      </S.QuestionNotice>
      <S.QuestionExplain>
        <div>
          <h2> Writing a good question</h2>
          <p>
            You’re ready to{' '}
            <span style={{ color: 'var(--color-searchBtn)' }}>ask</span> a{' '}
            <span style={{ color: 'var(--color-searchBtn)' }}>
              programming-related question
            </span>{' '}
            and this form will help guide you through the process.
          </p>
          <p>
            Looking to ask a non-programming question? See{' '}
            <span style={{ color: 'var(--color-searchBtn)' }}>
              the topics here
            </span>{' '}
            to find a relevant site.
          </p>
          <h5>Steps</h5>
          <ul>
            {stepsList.map((el, idx) => (
              <li key={idx}>{el.description}</li>
            ))}
          </ul>
        </div>
      </S.QuestionExplain>

      <S.AskquestionMain>
        <S.AskquestionInputComponent>
          <S.Leftside>
            <S.Leftcontainer>
              <S.Leftcontainerwrapper>
                <h4 className="lefttitle">Title</h4>
                <p>
                  Be specific and imagine you’re asking a question to another
                  person.
                </p>
                <S.InputContainer>
                  <S.Input
                    isFocus={isFocus}
                    value={inputValue.title}
                    onChange={handleInputTitle}
                    type="text"
                    placeholder="e.g. is there an R function for finding the index of an element in a vector?"
                  ></S.Input>
                </S.InputContainer>
                <S.NextBtn onClick={handleNextStep}>Next</S.NextBtn>
              </S.Leftcontainerwrapper>
            </S.Leftcontainer>
          </S.Leftside>
          <QuestionSidebar
            title="Writing a good title"
            text={[
              'Your title should summarize the problem.',
              'You might find that you have a better idea of your title after writing out the rest of the question.',
            ]}
            isFocus={currentStep === 0}
          />
        </S.AskquestionInputComponent>

        <S.AskquestionInputComponent>
          <S.Leftside>
            {currentStep < 1 && <S.LeftsideOverlay isFocus={isFocus} />}
            <S.Leftcontainer>
              <S.Leftcontainerwrapper>
                <h4 className="lefttitle">
                  What are the details of your problem?
                </h4>
                <p>
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </p>
                <S.EditorContainer>
                  <S.Editortextarea
                    ref={editorRef}
                    value={inputValue.content}
                    onChange={handleInputContent}
                  />
                </S.EditorContainer>
                {currentStep > 0 && (
                  <S.NextBtn onClick={handleNextStep}>Next</S.NextBtn>
                )}
              </S.Leftcontainerwrapper>
            </S.Leftcontainer>
          </S.Leftside>
          <QuestionSidebar
            title="Introduce the problem"
            text={[
              'Explain how you encountered the problem you’re trying to solve, and any difficulties that have prevented you from solving it yourself.',
            ]}
            isFocus={currentStep === 1}
          />
        </S.AskquestionInputComponent>

        <S.AskquestionInputComponent>
          <S.Leftside>
            {currentStep < 2 && <S.LeftsideOverlay isFocus={isFocus} />}
            <S.Leftcontainer>
              <S.Leftcontainerwrapper>
                <h4 className="lefttitle">
                  What did you try and what were you expecting?
                </h4>
                <p>
                  Describe what you tried, what you expected to happen, and what
                  actually resulted. Minimum 20 characters.
                </p>
                <S.EditorContainer>
                  <S.Editortextarea
                    ref={editorRef}
                    value={inputValue.expection}
                    onChange={handleInputExpection}
                  />
                </S.EditorContainer>
                {currentStep > 1 && (
                  <S.NextBtn onClick={handleNextStep}>Next</S.NextBtn>
                )}
              </S.Leftcontainerwrapper>
            </S.Leftcontainer>
          </S.Leftside>
          <QuestionSidebar
            title="Expand on the problem"
            text={[
              'Show what you’ve tried, tell us what happened, and why it didn’t meet your needs.',
              'Not all questions benefit from including code, but if your problem is better understood with code you’ve written, you should include a minimal, reproducible example.',
              'Please make sure to post code and errors as text directly to the question (and not as images), and format them appropriately.',
            ]}
            isFocus={currentStep === 2}
          />
        </S.AskquestionInputComponent>

        <S.AskquestionInputComponent>
          <S.Leftside>
            {currentStep < 3 && <S.LeftsideOverlay isFocus={isFocus} />}
            <S.Leftcontainer>
              <S.Leftcontainerwrapper>
                <h4 className="lefttitle">Tags</h4>
                <p>
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see suggestions.
                </p>
                <S.InputContainer>
                  <S.Input
                    value={inputValue.tag?.join('')}
                    onChange={handleInputTag}
                    isFocus={isFocus}
                    type="text"
                    placeholder="e.g. (angular regex django)"
                  ></S.Input>
                </S.InputContainer>
                {currentStep > 2 && (
                  <S.NextBtn onClick={handleNextStep}>Next</S.NextBtn>
                )}
              </S.Leftcontainerwrapper>
            </S.Leftcontainer>
          </S.Leftside>
          <QuestionSidebar
            title="Adding tags"
            text={[
              'Stack Overflow is a huge database of knowledge.',
              'Please make sure your question isn’t already answered before posting, or your question might be closed as a duplicate.',
            ]}
            isFocus={currentStep === 3}
          />
        </S.AskquestionInputComponent>

        <S.AskquestionInputComponent>
          <S.Leftside>
            {currentStep < 4 && <S.LeftsideOverlay isFocus={isFocus} />}
            <S.Leftcontainer>
              <S.Leftcontainerwrapper>
                <h4 className="lefttitle">
                  Review questions already on Stack Overflow to see if your
                  question is a duplicate.
                </h4>
                <p>
                  Clicking on these questions will open them in a new tab for
                  you to review. Your progress here will be saved so you can
                  come back and continue.
                </p>
                <S.InputContainer>
                  <S.Input
                    isFocus={isFocus}
                    type="text"
                    placeholder="e.g. is there an R function for finding the index of an element in a vector?"
                  ></S.Input>
                </S.InputContainer>
                {currentStep > 3 && (
                  <S.NextBtn onClick={handleSubmit}>
                    Review your question
                  </S.NextBtn>
                )}
              </S.Leftcontainerwrapper>
            </S.Leftcontainer>
          </S.Leftside>
          <QuestionSidebar
            title="Make sure we don’t already have an answer for your question"
            text={[
              'Stack Overflow is a huge database of knowledge.',
              'Please make sure your question isn’t already answered before posting, or your question might be closed as a duplicate.',
            ]}
            isFocus={currentStep === 4}
          />
        </S.AskquestionInputComponent>
      </S.AskquestionMain>
    </S.AskQuestionPage>
  );
}

function QuestionSidebar({
  title,
  text,
  isFocus,
}: QuestionSidebarProps & IsFocusProps) {
  return (
    <S.QuestionSidebar isFocus={isFocus}>
      <S.QuestionSidebarTitle>{title}</S.QuestionSidebarTitle>
      <S.QuestionSidebarTextContainer>
        <S.QuestionSidebarIcon>
          {title ===
          'Make sure we don’t already have an answer for your question' ? (
            <TbBellRinging2Filled />
          ) : (
            <TfiPencil />
          )}
        </S.QuestionSidebarIcon>
        <S.QuestionSidebarText>
          {text.map((el, idx) => (
            <p key={idx}>{el}</p>
          ))}
        </S.QuestionSidebarText>
      </S.QuestionSidebarTextContainer>
    </S.QuestionSidebar>
  );
}

const S = {
  AskQuestionPage: styled.section`
    max-width: 1264px;
    width: 100%;
    height: 100%;
    padding: 25px 24px 0 24px;
  `,
  QuestionNotice: styled.div`
    display: flex;
    align-items: center;
    max-width: 1216px;
    width: 100%;
    > h1 {
      font-size: 30px;
      width: 100%;
      margin: 0 0 1em;
      color: black;
    }
    > img {
      height: 130px;
      width: 100%;
    }
  `,
  QuestionExplain: styled.div`
    width: 100%;
    color: black;
    margin: 16px 0px;
    > div {
      background-color: var(--color-button-sky);
      padding: 24px;
      max-width: 851px;
      width: 100%;
      border-radius: 3px;
      border: 1px solid var(--color-ui-border-click);
      > h2 {
        margin-bottom: 8px;
      }
      > h5 {
        margin-top: 1em;
        margin-bottom: 8px;
      }
      > ul {
        padding-left: 30px;
        > li {
          list-style: disc;
        }
      }
    }
  `,
  AskquestionMain: styled.main`
    margin-bottom: 48px;
    max-width: 1216px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  AskquestionInputComponent: styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 14px;
    position: relative;
  `,
  LeftsideOverlay: styled.div<IsFocusProps>`
    position: absolute;
    top: 0;
    left: 0;
    max-width: 851px;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 1;
    border: 1px solid var(--color-navbar-button-hover);
    border-radius: 3px;
    border-width: 1px;
    cursor: ${(props: IsFocusProps) =>
      props.isFocus ? 'cursor' : 'not-allowed'};
  `,
  Leftside: styled.div`
    max-width: 851px;
    width: 100%;
    margin-right: 20px;
    background-color: white;
    border: 1px solid var(--color-navbar-button-hover);
    border-radius: 3px;
  `,
  Leftcontainer: styled.div`
    padding: 24px;
  `,
  Leftcontainerwrapper: styled.div`
    display: flex;
    flex-direction: column;
    color: black;
  `,
  EditorContainer: styled.div`
    margin-top: 5px;
    height: 210px;
  `,
  Editortextarea: styled.textarea`
    width: 100%;
    height: 100%;
    padding: 10px;
    outline: none;
    border-radius: 3px;
    resize: none;
    border: 1px solid var(--input-border-color);
    &:focus {
      border-color: #69b9f7;
      box-shadow: 0px 0px 0px 4px rgba(105, 185, 247, 0.3);
    }
  `,
  InputContainer: styled.div`
    margin-top: 5px;
  `,
  Input: styled.input<IsFocusProps>`
    border: 1px solid var(--input-border-color);
    border-radius: 3px;
    width: 100%;
    padding: 7px 9px;
    outline: none;
    &:focus {
      border-color: #69b9f7;
      box-shadow: 0px 0px 0px 4px rgba(105, 185, 247, 0.3);
    }
  `,
  NextBtn: styled.button`
    width: fit-content;
    padding: 10px;
    border-radius: 3px;
    margin-top: 5px;
    background-color: var(--color-button-blue);
    border: 1px solid var(--color-button-border);
    color: var(--color--button-signup);
    &:hover {
      background-color: var(--color-button-blue-hover);
    }
  `,
  QuestionSidebar: styled.div<IsFocusProps>`
    margin-bottom: 14px;
    width: 20%;
    color: black;
    border: 1px solid var(--color-ui-border);
    border-radius: 3px;
    box-shadow: var(--bs-sm);
    align-self: flex-start;
    display: ${(props: IsFocusProps) => (props.isFocus ? 'block' : 'none')};
  `,
  QuestionSidebarTitle: styled.div`
    border-bottom: 1px solid var(--color-ui-border);
    background-color: var(--color-sidebar-gray);
    padding: 12px;
    width: 100%;
  `,
  QuestionSidebarTextContainer: styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
  `,
  QuestionSidebarIcon: styled.div`
    display: flex;
    align-self: flex-start;
    justify-content: center;
    margin-right: 16px;
    font-size: 48px;
    width: 48px;
  `,
  QuestionSidebarText: styled.div`
    width: 100%;
    > p {
      margin-bottom: 10px;
      font-size: 12px;
    }
  `,
};
