import { styled } from 'styled-components';
import QuestionItem from './QuestionItem';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { questionDetailAPI } from '../../api/QuestionDetailApi';

import Sample from './Sample';

import { QuestionData } from '../../types/types';

// interface RouteParams {
//     questionId: string;
//   }
const QuestionDetail=()=>{

    const { questionId } = useParams();
    const query = useQuery(['getQuestionDetail',questionId], () => questionDetailAPI.fetchCertainQuestion(questionId));

    const questionData = query.data;
    console.log(query.data);
    return (
        <S.Container>
            <section>
                <QuestionItem questionData={questionData}/>
                {/* <Sample questionData={questionData} /> */}
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