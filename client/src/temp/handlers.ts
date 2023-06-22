// 목업 서버 (나중에 쉽게 삭제하게 한 파일에 다 넣어두면 좋을 것 같아요)
import allQuestions from './AllQuestionQuery.json';
import { questionQuery } from './questionQuery';
import { rest } from 'msw';

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
    const processedData = allQuestions.data.slice(from, to);
    const pageInfo = {
      page: parseInt(page),
      totalElements: size,
      totalPages: Math.ceil(allQuestions.data.length / parseInt(size)),
    };
    return res(
      ctx.status(200),
      ctx.json({ data: processedData, pageInfo: pageInfo })
    );
  }),

  // 💜 답변 GET
  rest.get('/questions/:questionId', (req, res, ctx) => {
    const questionId: number = parseInt(req.params.questionId[0]); //
    const answerData = questionQuery.data.find(
      question => question.questionId === questionId
    )?.questionAnswers;

    if (!answerData) {
      return res(ctx.status(404), ctx.json({ message: 'Question not found' }));
    }

    return res(ctx.status(200), ctx.json({ data: answerData }));
  }),

  // 💜 답변 POST
  rest.post('/answers/register/:questionId', (req, res, ctx) => {
    const { questionId } = req.params;
    // const { answerContent, createdAt, userInfo } = req.body;

    // const newAnswer = {
    //   answerId
    //   answerContent,
    //   createdAt,
    //   userInfo,
    // };
    return res(ctx.status(200), ctx.json(newAnswer));
  }),
];
