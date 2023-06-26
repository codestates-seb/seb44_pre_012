package pre_Project.server.domain.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pre_Project.server.domain.answer.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

}