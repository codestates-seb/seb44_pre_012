import { styled } from 'styled-components';
import { data } from '../../temp/questionQuery.json';
import QuestionDetailnfo from './QuestionDetailInfo';
import '../../index.css';

const QuestionHead=()=>{
    return (
        <div>
            <S.TitleDiv>
                <S.Title>{data[0].question.questionTitle}</S.Title>
                <S.AskDiv><S.AskButton>Ask Question</S.AskButton></S.AskDiv>
            </S.TitleDiv>
            <S.InfoContainer>
                <QuestionDetailnfo title={"Asked"} content={"date?"}/>
                <QuestionDetailnfo title={"Modified"} content={"date?"}/>
                <QuestionDetailnfo title={"Viewed"} content={"date?"}/>
            </S.InfoContainer>
        </div>
    )
}

const S = {
    TitleDiv:styled.div`
        display:flex;
        flex: 1 auto;
        margin-bottom: 8px;
    `,
    Title:styled.h1`
        font-size: 1.8rem;
        color: #3b4045;
        line-height: 1.35;
        font-weight:400;
        margin-top: -2px;
    `,
    AskDiv:styled.div`
        display: block;
        margin-left: 12px;
    `,
    AskButton: styled.button`
        padding: 10.4px;
        height: 38px;
        background: var(--color-button-blue);
        border: 1px solid var(--color-button-blue);
        font-weight: 500;
        color: #ffffff;
        border-radius: 3px;
        white-space: nowrap;
        box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
        font-size: 13px;
        &:hover {
        background: var(--color-content-title);
        }
    `,

    InfoContainer:styled.div`
        display: flex;
        border-bottom: 1px solid hsl(210, 8%, 90%);
        padding-bottom: 8px;
        margin-bottom: 16px;

    `,
    infoTitle:styled.span`
        color: #6A737C;
    `,
    infoText:styled.span`
        color: #232629;
    `,
}

export default QuestionHead;