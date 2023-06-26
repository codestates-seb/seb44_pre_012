package pre_Project.server.domain.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pre_Project.server.domain.answer.entity.Answer;
import pre_Project.server.domain.answer.repository.AnswerRepository;
import pre_Project.server.domain.answer.service.AnswerService;
import pre_Project.server.domain.comment.entity.Comment;
import pre_Project.server.domain.comment.repository.CommentRepository;
import pre_Project.server.domain.question.repository.QuestionRepository;
import pre_Project.server.domain.user.repository.UserRepository;
import pre_Project.server.global.exception.BusinessLogicException;
import pre_Project.server.global.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final AnswerRepository answerRepository;

    public Comment createComment(Comment comment) {

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Optional<Comment> optionalComment = commentRepository.findById(comment.getCommentId());
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        Optional.ofNullable(comment.getCommentContent())
                .ifPresent(commentContent -> findComment.setCommentContent(commentContent));

        Optional.ofNullable(comment.getModifiedAt())
                .ifPresent(commentUpdatedAt -> findComment.setModifiedAt(commentUpdatedAt));


        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("commentId").descending()));

    }

    public void deleteComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        commentRepository.delete(findComment);
    }
}