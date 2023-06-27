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



export interface QuestionAnswer {
  questionAnswerContent: string;
  createdAt: Date | string;
  userName: string;
  userId?: number;
  voteCount?: number;
  modifiedAt?: string;
  questionAnswerId: number;
}
export interface QuestionData {
  questionId: number | undefined | string;
  questionTitle: string;
  questionContent: string;
  userName: string;
  viewCount: number;
  createdAt: string;
  modifiedAt?: string;
  questionAnswers: QuestionAnswer[] | QuestionAnswer;
  voteCount?: number;
}
export interface QuestionPostAnswer {
  questionAnswerContent: string;
  createdAt: Date | string;
  userName: string;
  userId?: number;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface RegisterInfo {
  userName: string;
  email: string;
  password: string;
}

export interface QuestionPost {
  questionContents: object;
  createdAt: Date | string;
  userName: string;
}