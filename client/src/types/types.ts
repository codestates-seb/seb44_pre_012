export interface QuestionInfo {
  questionId: number;
  questionTitle: string;
  questionContent: string;
  userName: string;
  tag: string[];
  createdAt: string;
  voteCount: number;
  answerCount: number;
  viewCount: number;
  bounty?: number;
}

export interface QuestionData {
  questionId:number;
  questionTitle:string;
  questionContent:string;
  userName:string;
  viewCount:number;
  createdAt:string;
  modifiedAt:string;
  questionAnswers?:AnswerData;
}

export interface AnswerData {
  questionAnswerId: number;
  questionAnswerContent: string;
  userId: number;
  userName: string;
  createdAt: string;
  modifiedAt: string;
}