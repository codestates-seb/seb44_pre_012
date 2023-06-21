package pre_Project.server.domain.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pre_Project.server.domain.question.entity.Question;
import pre_Project.server.domain.question.repository.QuestionRepository;
import pre_Project.server.domain.user.entitiy.User;
import pre_Project.server.domain.user.repository.UserRepository;
import pre_Project.server.exception.BusinessLogicException;
import pre_Project.server.exception.ExceptionCode;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    /*
    user id를 알아낸 다음 질문 엔티티의 user 객체에 넣고 저장
     */
    public Question createQuestion(Question question, User user) {
        userRepository.findById(user.getUserId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        question.setUser(user);

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

        return foundQuestion;
    }

    public Page<Question> findQuestions(int page, int size) {
        Page<Question> findAllQuestions = questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));

        return findAllQuestions;
    }

    public void deleteQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question foundQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        questionRepository.delete(foundQuestion);
    }
}
