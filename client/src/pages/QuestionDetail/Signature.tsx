import { styled } from 'styled-components';
// import { data } from '../../temp/questionQuery.json';
import '../../index.css';

import colors from '../../constants/colorNames';
import { QuestionData } from '../../types/types';

interface QuestionDataProps {
    questionData: QuestionData;
  }

const Signature=({questionData}:QuestionDataProps)=>{
    return (
    <S.FlexWrap>
        <div>
            <S.UserAction>
                <span>
                    asked
                </span>
                <span>
                    time ago    
                </span>
            </S.UserAction>
            <S.UserDiv>
                <S.UserImg>{questionData?.userName.slice(0, 1).toUpperCase()}</S.UserImg>
                <S.UserDetail>
                    <S.UserName>
                        <span>{questionData.userName}</span>
                    </S.UserName>
                    <S.Wrap>
                        <S.UserReputation>
                            <span>{getRandomNumber()}</span>
                        </S.UserReputation>
                        <S.UserBadge>
                            <button></button>
                        </S.UserBadge>
                        <S.UserScore>
                            <span>{4}</span>
                        </S.UserScore>
                    </S.Wrap>
                </S.UserDetail>
            </S.UserDiv>
        </div>
    </S.FlexWrap>
    )
}

const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
const getRandomNumber = (): number => {
    return Math.floor(Math.random() * 100);
};

const S= {
    FlexWrap:styled.div`
    display: flex;
    border-radius: 3px;
    background-color: #d9eaf7;
    padding: 1px 6px 3px 7px;
`,
    
    UserAction:styled.div`
            margin-top: 1px;
        >span {
            font-size:12px;
            margin-right: 4px;
        }
    `,
    UserDiv:styled.div`
        display: flex;
        align-items: center;
    `,

    UserImg: styled.button`
        width: 32px;
        height: 32px;
        border-radius: 3px;
        background-color: ${getRandomColor};
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        color: white;
    `,
    UserDetail:styled.div`
    display: block;
    margin-left:8px;
    `,

    UserName:styled.div`
        >span{
            color: #0074cc;
            font-size: 12px;
            &:hover {
                color: #0A95FF;
            }
        }
    `,
    Wrap:styled.div`
        display: flex;
        align-items:start;
    `,
    UserReputation:styled.div`
        /* height: 14px; */
        >span{
            font-size: 12px;
            font-weight: bold;
        }
    `,
    
    UserBadge:styled.div`
            margin: -1px 4px 0 6px;
        >button{
            background-color: #D1A684;
            border-radius:50%;
            width:5px;
            height:5px;
        }
    `,

    UserScore:styled.div`
        >span{
            color: hsl(210, 8%, 55%);
            font-size: 12px;
        }
    `
}

export default Signature;