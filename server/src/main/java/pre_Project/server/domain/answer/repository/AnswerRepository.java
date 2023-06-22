package pre_Project.server.domain.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pre_Project.server.domain.answer.entity.Answer;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Optional<Answer> findById(Long id);
    Optional<List<Answer>> findAllByQuestionId(Long id);
}