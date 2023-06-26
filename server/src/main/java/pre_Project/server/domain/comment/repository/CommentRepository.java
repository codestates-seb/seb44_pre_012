package pre_Project.server.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pre_Project.server.domain.comment.entity.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByAnswer_AnswerId(long answerId);
}