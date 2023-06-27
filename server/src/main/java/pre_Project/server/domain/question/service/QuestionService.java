package pre_Project.server.domain.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pre_Project.server.domain.question.entity.Question;
import pre_Project.server.domain.question.repository.QuestionRepository;
import pre_Project.server.global.exception.BusinessLogicException;
import pre_Project.server.global.exception.ExceptionCode;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;

    public Question createQuestion(Question question) {

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question) {
        Question findQuestion = questionRepository.findById(
                question.getQuestionId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        Optional.ofNullable(question.getQuestionTitle()).ifPresent(title -> findQuestion.setQuestionTitle(title));
        Optional.ofNullable(question.getQuestionContent()).ifPresent(content -> findQuestion.setQuestionContent(content));

        return questionRepository.save(findQuestion);
    }


    public Question findQuestion(long questionId) {

        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question foundQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        foundQuestion.setView(foundQuestion.getView() + 1);

        return questionRepository.save(foundQuestion);
    }

    public Page<Question> findQuestions(int page, int size) {
        Page<Question> findAllQuestions = questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").ascending()));

        return findAllQuestions;
    }

    public void deleteQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question foundQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        questionRepository.delete(foundQuestion);
    }
}
