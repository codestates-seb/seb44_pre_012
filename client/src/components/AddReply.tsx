import '../index.css';
import { styled } from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useState, useEffect } from 'react';
import RecommendLogin from './RecommendLogin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questionsAPI } from '../api/QuestionListApi';

export default function AddReply() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.login.isLogin
  );
  const [renderedData, setRenderedData] = useState('');
  const [nameData, setNameData] = useState('');
  const [emailData, setEmailData] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (emailData.includes('@')) {
      setIsValid(true);
    }
  }, [emailData]);

  const userName = nameData; // temp 
  const createdAt = new Date();
  const questionAnswerContent = renderedData;

  const requestBody = {
    questionAnswerContent,
    userName,
    createdAt,
  };
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(() =>
    questionsAPI.postAnswerQuestion(1, requestBody)
  );
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async e => {
    if (!userName || !emailData || !isValid) {
      return;
    }
    await mutateAsync();
    setRenderedData('');
    queryClient.invalidateQueries(['fetchCertainAnswer']);
    setEmailData('');
    setNameData('');
    setIsValid(false);
  };

  return (
    <S.ReplyContainer className="App">
      <S.H2>Your Answer</S.H2>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: '내용을 입력하세요 ✨',
          toolbar: {
            items: [
              // 'fontSize',
              // 'fontFamily',
              // 'fontColor',
              // 'fontBackgroundColor',
              // 'imageInsert',
              'bold',
              'italic',
              '|',
              'link',
              'blockQuote',
              //
              'imageUpload',
              '|',
              'numberedList',
              'bulletedList',
              '|',
              'heading',
              'undo',
              'redo',
              '|',
              'CKFinder',
              'underline',
              'strikethrough',
              'highlight',
              'removeFormat',
              'alignment',
              'indent',
              'outdent',
              'todoList',
              'insertTable',
              'mediaEmbed',
            ],
          },
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setRenderedData(data);
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          // console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          // console.log('Focus.', editor);
        }}
      />
      <S.InputLabel>
        <input type="checkbox" />
        <div>Community wiki</div>
      </S.InputLabel>
      {!isLoggedIn ? (
        <RecommendLogin
          nameData={nameData}
          setNameData={setNameData}
          emailData={emailData}
          setEmailData={setEmailData}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      ) : null}
      <S.PostButtonBox>
        <button onClick={handleSubmit}>Post Your Answer</button>
      </S.PostButtonBox>
      <S.RecommendSentence>
        <div>
          Not the answer you're looking for? Browse other questions tagged or
          <a> ask your own question.</a>
        </div>
      </S.RecommendSentence>
    </S.ReplyContainer>
  );
}

const S = {
  RenderedReplyContainer: styled.div`
    width: 100%;
    height: 50px;
  `,

  ReplyContainer: styled.div`
    padding: 24px;
    height: 35rem;
  `,
  H2: styled.h2`
    color: var(--color-page-title);
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 15px;
  `,
  InputLabel: styled.label`
    display: flex;
    justify-content: flex-end;
    margin: 7px 0;
    font-size: 1rem;
    color: var(--color-page-title);
    > input {
      margin-right: 5px;
    }
    > div {
    }
  `,
  RenderedPost: styled.div`
    width: 100%;
  `,
  PostButtonBox: styled.div`
    display: flex;
    justify-content: center;
    > button {
      padding: 10.4px;
      margin-bottom: 23px;
      height: 38px;
      background: var(--color-button-blue);
      border: 1px solid var(--color-button-blue);
      font-weight: 500;
      color: #ffffff;
      border-radius: 3px;
      box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
      font-size: 13px;
      &:hover {
        background: var(--color-content-title);
      }
    }
  `,
  RecommendSentence: styled.div`
    padding: 0 10px;
    div {
      color: var(--color-page-title);
      font-size: 1rem;
      font-weight: 400;
      @media (max-width: 600px) {
        display: none;
      }
      > a {
        color: var(--color-content-title);
        &:hover {
          color: var(--color-button-blue);
        }
      }
    }
  `,
};
