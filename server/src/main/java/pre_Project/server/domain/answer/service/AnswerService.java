package pre_Project.server.domain.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pre_Project.server.domain.answer.entity.Answer;
import pre_Project.server.domain.answer.repository.AnswerRepository;
import pre_Project.server.domain.question.entity.Question;
import pre_Project.server.domain.question.repository.QuestionRepository;
import pre_Project.server.domain.user.entitiy.User;
import pre_Project.server.domain.user.repository.UserRepository;
import pre_Project.server.global.exception.BusinessLogicException;
import pre_Project.server.global.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public Answer createAnswer(Answer answer) {

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answer.getAnswerId());
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        Optional.ofNullable(answer.getAnswerContent())
                .ifPresent(answerContent -> findAnswer.setAnswerContent(answerContent));

        Optional.ofNullable(answer.getModifiedAt())
                .ifPresent(answerUpdatedAt -> findAnswer.setModifiedAt(answerUpdatedAt));


        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }

    public List<Answer> findAnswers() {
        return answerRepository.findAll(Sort.by("AnswerId").descending());
    }

    public void deleteAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        answerRepository.delete(findAnswer);
    }
}