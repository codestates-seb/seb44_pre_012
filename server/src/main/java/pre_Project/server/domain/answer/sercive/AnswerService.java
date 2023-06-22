package pre_Project.server.domain.answer.sercive;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import pre_Project.server.domain.answer.dto.AnswerDto;
import pre_Project.server.domain.answer.entity.Answer;
import pre_Project.server.domain.answer.repository.AnswerRepository;
import pre_Project.server.domain.question.entity.Question;
import pre_Project.server.domain.question.repository.QuestionRepository;
import pre_Project.server.global.exception.BusinessLogicException;

import java.lang.reflect.Member;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public class AnswerService {
    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;

    public AnswerService(AnswerRepository answerRepository, MemberRepository memberRepository, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.memberRepository = memberRepository;
        this.questionRepository = questionRepository;
    }

    public Answer createAnswer(AnswerDto.Post post, String email) {
        Question question = questionRepository.findById(post.getQuestion_id()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Answer answer = new Answer();
        answer.setContent(post.getContent());
        answer.setQuestion(question);
        answer.setMember(member);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer, long id, String email) {
        Answer findAnswer = findAnswer(id);

        if (!findAnswer.getMember().getEmail().equals(email)) throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_EDIT);

        Optional.ofNullable(answer.getContent()).ifPresent(content -> findAnswer.setContent(content));
        findAnswer.setModified_at(LocalDateTime.now());

        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(long id) {
        Optional<Answer> optionalAnswer = answerRepository.findById(id);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }

    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page,size, Sort.by("id").descending()));
    }

    public List<Answer> findAnswers(long questionId)
    {
        Optional<List<Answer>> optional = answerRepository.findAllByQuestionId(questionId);

        List<Answer> answers = optional.orElse(null);

        return answers;
    }

    public void deleteAnswer(long id, String email) {
        Answer findAnswer = findAnswer(id);
        if (!findAnswer.getMember().getEmail().equals(email)) throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_EDIT);

        answerRepository.delete(findAnswer);
    }

}