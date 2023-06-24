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

export interface QuestionPostAnswer {
  questionAnswerContent: string;
  createdAt: Date | string;
  userName: string;
  userId?: number;

}
