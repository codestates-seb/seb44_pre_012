import { styled } from 'styled-components';

type Props = {
    title: string;
    content: string | number;
  };

const QuestionDetailInfo=({title, content}: Props)=>{
    return (
        <S.InfoDiv>
            <S.InfoTitle>{title}</S.InfoTitle>
            <S.InfoText>{content}</S.InfoText>
        </S.InfoDiv>
    )}

const S={
    InfoDiv:styled.div`
    display: block;
    margin-right:16px;
    margin-bottom:8px;
    `,
    InfoTitle:styled.span`
    color: #6A737C;
    margin: 4px;
    `,
    InfoText:styled.span`
    color: #232629;
    `
}

export default QuestionDetailInfo;
