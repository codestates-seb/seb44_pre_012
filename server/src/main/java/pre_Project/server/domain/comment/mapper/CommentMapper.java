package pre_Project.server.domain.comment.mapper;

import org.mapstruct.Mapper;
import pre_Project.server.domain.answer.dto.AnswerResponseDto;
import pre_Project.server.domain.answer.entity.Answer;
import pre_Project.server.domain.comment.dto.CommentPatchDto;
import pre_Project.server.domain.comment.dto.CommentPostDto;
import pre_Project.server.domain.comment.dto.CommentResponseDto;
import pre_Project.server.domain.comment.entity.Comment;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentPostDto commentPostDto);
    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);
    CommentResponseDto commentToCommentResponseDto(Comment comment);
    List<CommentResponseDto> CommentsToCommentResponseDtos(List<Comment> comment);
}