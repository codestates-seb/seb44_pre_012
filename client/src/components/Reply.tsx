import '../index.css';
import { styled } from 'styled-components';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import '../index.css';

// 유저 아이디 있어야 함.

export default function QuestionList() {
  const [renderedData, setRenderedData] = useState('');

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
          // console.log({ event, editor, data });
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
      <S.RenderedPost>
        <div>{parse(renderedData)}</div>
      </S.RenderedPost>
      <S.PostButtonBox>
        <button>Post Your Answer</button>
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
  ReplyContainer: styled.div`
    padding: 24px;
    /* border: 1px solid green; */
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
      border: 1px solid red;
    }
    > div {
    }
  `,
  RenderedPost: styled.div`
    width: 100%;
  `,
  PostButtonBox: styled.div`
    > button {
      padding: 10.4px;
      margin: 23px 0;
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
    div {
      color: var(--color-page-title);
      font-size: 1rem;
      font-weight: 500;

      > a {
        color: var(--color-content-title);
        &:hover {
          color: var(--color-button-blue);
        }
      }
    }
  `,
};
