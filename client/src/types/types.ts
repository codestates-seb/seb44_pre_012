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
  questionId: number | undefined | string;
  questionTitle: string;
  questionContent: string;
  userName: string;
  viewCount: number;
  createdAt: string;
  modifiedAt?: string;
  questionAnswers: QuestionAnswer;
}

export interface QuestionAnswer {
  questionAnswerId: number;
  questionAnswerContent: string;
  userId: number;
  userName: string;
  voteCount: number;
  createdAt: string;
  modifiedAt?: string;
}

export interface Comment {
  commentId: number;
  commentContent: string;
  createdAt: string;
  modifiedAt?: string;
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