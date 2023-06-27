package pre_Project.server.domain.comment.mapper;

import org.mapstruct.Mapper;
import pre_Project.server.domain.answer.entity.Answer;
import pre_Project.server.domain.comment.dto.CommentPatchDto;
import pre_Project.server.domain.comment.dto.CommentPostDto;
import pre_Project.server.domain.comment.dto.CommentResponseDto;
import pre_Project.server.domain.comment.entity.Comment;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment commentPostDtoToComment(long answerId, CommentPostDto commentPostDto) {
        Comment comment = new Comment();
        comment.setCommentContent(commentPostDto.getCommentContent());

        Answer answer = new Answer();
        answer.setAnswerId(answerId);
        comment.setAnswer(answer);

        return comment;
    }

    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);

    default CommentResponseDto commentToCommentResponseDto(Comment comment) {
        if (comment == null) {
            return null;
        }

        long commentId = comment.getCommentId();
        long answerId = comment.getAnswer().getAnswerId();
        String CommentContent = comment.getCommentContent();
        LocalDateTime createdAt = comment.getCreatedAt();
        LocalDateTime modifiedAt = comment.getModifiedAt();

        CommentResponseDto response = new CommentResponseDto(
                commentId, answerId, CommentContent, createdAt, modifiedAt);

        return response;
    }

    List<CommentResponseDto> CommentsToCommentResponseDtos(List<Comment> comment);
}