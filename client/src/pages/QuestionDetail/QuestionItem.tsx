import { styled } from 'styled-components';
// import { data } from '../../temp/questionQuery.json';
import QuestionHead from './QuestionHead';
import Aside from '../Question/Aside';
import VoteCell from '../../components/VoteCell';
// import { data as dataAll } from '../../temp/AllQuestionQuery.json';
import '../../index.css';
import Signature from './Signature';
import { QuestionData } from '../../types/types';

interface QuestionDataProps {
    questionData: QuestionData;
  }

const QuestionItem=({questionData}:QuestionDataProps)=>{

    return (
        <S.Section>
            <QuestionHead questionData={questionData}/>
             <S.Div>
                 <S.ContentLayout>
                     <VoteCell />
                     <S.PostCell>
                         <article>
                             <p>{questionData.questionContent}</p>
                         </article>
                        <S.PostEnd>
                            <S.FlexWrap>
                                <S.PostMenu>
                                    <span>Share</span>
                                    <button>Follow</button>
                                </S.PostMenu>
                                <S.Signature>
                                    <Signature questionData={questionData}/>
                                </S.Signature>
                            </S.FlexWrap>
                        </S.PostEnd>
                    </S.PostCell>
                </S.ContentLayout>
                {/* <S.AsideWrap>
                    <Aside />
                </S.AsideWrap> */}
            </S.Div>
        </S.Section>
    )
}

const S = {
    Section:styled.div`
        display:block;
        padding:24px;
    `,
    Div:styled.div`
        display:flex;
    `,
    ContentLayout:styled.div`
        display: grid;
        grid-template-columns: max-content 1fr;
    `,
    AsideWrap:styled.div`
        margin: -25px 0 15px 0;
    `,
    Vote:styled.div`
        display: flex;
    `,
    PostCell:styled.div`
        >article{
            >p{
                white-space: pre-wrap;
            }
        }
    `,

    TagList:styled.div`
        display:flex;
        margin:20px 0 37px 0;
    `,
    Tag: styled.button`
      border-radius: 3px;
      padding: 4px 6px;
      background-color: var(--color-button-sky);
      color: var(--color-tag-blue);
      margin-right: 6px;
      &:hover {
        background-color: var(--color-tag-skyblue-hover);
        color: var(--color-tag-blue-hover);
      }
    `,
    PostEnd:styled.div`
        display:block;
    `,
    FlexWrap:styled.div`
      display:flex;
        align-items: flex-start;
        justify-content: space-between;
        margin: 16px 0;
        padding-top:4px;  
    `,
    PostMenu:styled.div`
        >span{
            color: hsl(210, 8%, 45%);
            margin: 4px;
            &:hover{
            color: hsl(210, 8%, 55%);
        }}
        >button{
            color: hsl(210, 8%, 45%);
            &:hover{
            color: hsl(210, 8%, 55%);
            }

        }
    `,

    Signature:styled.div`
        display: block;
        width: 200px;
    `

    
}

export default QuestionItem;