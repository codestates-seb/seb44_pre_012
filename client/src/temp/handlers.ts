// 목업 서버
import allQuestions from './AllQuestionQuery.json';
import questionQuery from './questionQuery.json';
import { rest } from 'msw';

export const handlers = [
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
  rest.get('/questions/:questionId', (req, res, ctx) => {
    const questionId: number = parseInt(req.params.questionId[0]); //
    const questionData = questionQuery.data.filter(question => question.questionId === questionId);

    if (!questionData) {
      return res(ctx.status(404), ctx.json({ message: 'Question not found' }));
    }

    return res(ctx.status(200), ctx.json({ data: questionData }));
  }),
];
