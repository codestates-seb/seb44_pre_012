import { QuestionData } from '../../types/types';

interface QuestionDataProps {
    questionData: QuestionData;
  }

const Sample=({questionData}:QuestionDataProps)=>{

    console.log(questionData.createdAt);
    return (
            <div>
                일단 이거 나오는지..
            </div>

    )
}

export default Sample;