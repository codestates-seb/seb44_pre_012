import { styled } from 'styled-components';
import QuestionItem from './QuestionItem';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { questionDetailAPI } from '../../api/QuestionDetailApi';

const QuestionDetail=()=>{

    const { questionId } = useParams();
    const { data, isLoading } = useQuery(['getQuestionDetail',questionId], () => questionDetailAPI.fetchCertainQuestion(questionId));

    if (isLoading) {
        return <>Loading...</>
    }

    if(data[0]) {

    return (
        <S.Container>
            <section>
                <QuestionItem questionData={data[0]}/>
            </section>
            
        </S.Container>
    )
}
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