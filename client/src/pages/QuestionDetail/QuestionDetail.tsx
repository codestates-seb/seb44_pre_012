import { styled } from 'styled-components';
import QuestionItem from './QuestionItem';

const QuestionDetail=()=>{
    return (
        <S.Container>
            <section>
                <QuestionItem />
                
            </section>
            

        </S.Container>
    )
}

const S = {
    Container:styled.main`
        display:flex;
        >section{
            display: block;
        }
    `
}

export default QuestionDetail;