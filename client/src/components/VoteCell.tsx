import { styled } from 'styled-components';

const VoteCell=()=>{
    return (
            <S.Div>
                <S.Vote>
                    <svg height="18" width="18">
                        <polygon points="9,5 1,13 17,13" />
                    </svg>
                </S.Vote>
                <S.Num>
                    <span>0</span>
                </S.Num>
                <S.Vote>
                    <svg height="18" width="18">
                        <polygon points="9,13 1,5 17,5" />
                    </svg>
                </S.Vote>
            </S.Div>
    )
}

const S = {
    Div:styled.div`
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        padding-right: 16px;
    `,
    Vote:styled.button`
        border: 1px solid hsl(210, 8%, 85%);
        border-radius: 50%;
        padding: 10.4px;
        margin: 2px;
        >svg{
            >polygon{
                color:hsl(210, 8%, 25%);
            }
        }
    `,
    Num:styled.div`
        padding: 4px 0;
        margin: 2px;
        font-weight: 500;
        color: #232629;
        font-size: 20px;
    `,

}

export default VoteCell;