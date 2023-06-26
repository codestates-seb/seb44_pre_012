// 목업 서버 (나중에 쉽게 삭제하게 한 파일에 다 넣어두면 좋을 것 같아요)
// import allQuestions from './AllQuestionQuery.json';
import  questionQuery  from './questionQuery.json';
import { rest } from 'msw';
import CommentQuery from './CommentQuery.json'


export const handlers = [
  // 💜 allQuestion 쿼리
  rest.get('/questions', (req, res, ctx) => {
    const searchParams = new URLSearchParams(req.url.search);
    const size = searchParams.get('size');
    const page = searchParams.get('page');
    if (!size || !page) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Invalid query parameters' })
      );
    }
    const from = parseInt(page) * parseInt(size);
    const to = (parseInt(page) + 1) * parseInt(size);
    const processedData = questionQuery.data.slice(from, to);
    const pageInfo = {
      page: parseInt(page),
      totalElements: size,
      totalPages: Math.ceil(questionQuery.data.length / parseInt(size)),
    };
    return res(
      ctx.status(200),
      ctx.json({ data: processedData, pageInfo: pageInfo })
    );
  }),

  // 💜 답변 GET , 질문 상세 페이지 GET
  rest.get('/questions/:questionId', (req, res, ctx) => {
    const questionId: number = parseInt(req.params.questionId[0]); //
    const questionData = questionQuery.data.filter(question => question.questionId === questionId); // 질문 상세페이지

    const answerData = questionQuery.data.find(
      question => question.questionId === questionId
    )?.questionAnswers;

    if (!answerData||!questionData) {
      return res(ctx.status(404), ctx.json({ message: 'Question not found' }));
    }
    return res(ctx.status(200), ctx.json({ data: answerData, questionData: questionData }));


  }),

  // 💜 답변 POST
  rest.post('/answers/register/:questionId', (req, res, ctx) => {
    const questionId: number = parseInt(req.params.questionId[0]);
    const answerData = questionQuery.data.find(
      question => question.questionId === questionId
    )?.questionAnswers;

    const { questionAnswerContent, userName, createdAt }: any | undefined =
      req.body;
    const questionAnswerId = Math.floor(Math.random() * 1000);

    const newAnswer = {
      questionAnswerId,
      questionAnswerContent,
      createdAt,
      userName,
      userId: 0,
      modifiedAt: '',
      voteCount: 0,
    };

    answerData?.push(newAnswer);
    const responseBody = JSON.stringify(newAnswer);
    return res(ctx.status(201), ctx.json(responseBody));
  }),

  // 💜 답변 DELETE
  rest.delete('/answers/', (req, res, ctx) => {
    const searchParams = new URLSearchParams(req.url.search);
    const questionId = Number(searchParams.get('questionId'));
    const questionAnswerId = Number(searchParams.get('answerId'));

    const certainQuestionIndex = questionQuery.data.findIndex(question => {
      return question.questionId === questionId;
    });
    const certainAnswerIndex = questionQuery.data[
      certainQuestionIndex
    ].questionAnswers.findIndex(
      answer => answer.questionAnswerId === questionAnswerId
    );
    let newQuestionAnswerData;
    if (certainQuestionIndex !== -1 && certainAnswerIndex !== -1) {
      newQuestionAnswerData = questionQuery.data[
        certainQuestionIndex
      ].questionAnswers.splice(certainAnswerIndex, 1);
    }
    return res(ctx.status(200));
  }),
  rest.post('/questions/register', (req, res, ctx) => {
    const { questionContents, createdAt, userName }: any | undefined = req.body;
    let title; 
    let content;
    let tag;
    if (questionContents) {
      title = questionContents.title
      content = questionContents.content + questionContents.expection
      tag = questionContents.tag
    }
    
    // const {questionTitle, questionContent, tag} = questionContents;
    const questionId = questionQuery.data.length + 1;
    const modifiedAt = createdAt;
    const viewCount = 0;
    
    const newQuestion = {
      questionId,
      questionTitle: title,
      questionContent: content,
      userName,
      createdAt,
      modifiedAt,
      questionAnswers: [],
      viewCount,
      tag,
      voteCount: 0,
      answerCount: 0,
      bounty: 0
    };

    questionQuery.data.push(newQuestion);
    return res(ctx.status(201), ctx.json(newQuestion));
  }),


  /*질문 디테일 Get
  rest.get('/questions/:questionId', (req, res, ctx) => {
    const questionId: number = parseInt(req.params.questionId[0]); //
    const questionData = questionQuery.data.filter(question => question.questionId === questionId);

    if (!questionData) {
      return res(ctx.status(404), ctx.json({ message: 'Question not found' }));
    }
    return res(ctx.status(200), ctx.json({ data: questionData }));
  }),
  */


];
