package pre_Project.server.domain.answer.mapper;

import org.mapstruct.Mapper;
import pre_Project.server.domain.answer.dto.AnswerPatchDto;
import pre_Project.server.domain.answer.dto.AnswerPostDto;
import pre_Project.server.domain.answer.dto.AnswerResponseDto;
import pre_Project.server.domain.answer.entity.Answer;
import pre_Project.server.domain.comment.dto.CommentResponseDto;
import pre_Project.server.domain.question.entity.Question;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);

    default Answer answerPostDtoToAnswer(long questionId, AnswerPostDto answerPostDto) {

        Answer answer = new Answer();

        answer.setAnswerContent(answerPostDto.getAnswerContent());

        Question question = new Question();
        question.setQuestionId(questionId);
        answer.setQuestion(question);

        return answer;
    }

    default AnswerResponseDto answerToAnswerResponseDto(Answer answer) {
        if (answer == null) {
            return null;
        }

        long answerId;
        long questionId;
        String answerContent;
        LocalDateTime createdAt;
        LocalDateTime modifiedAt;

        answerId = answer.getAnswerId();
        questionId = answer.getQuestion().getQuestionId();
        answerContent = answer.getAnswerContent();
        createdAt = answer.getCreatedAt();
        modifiedAt = answer.getModifiedAt();

        List<CommentResponseDto> comments = answer.getComments().stream()
                .map(comment -> new CommentResponseDto(comment.getCommentId(), comment.getAnswer().getAnswerId(), comment.getCommentContent(), comment.getCreatedAt(), comment.getModifiedAt()))
                .collect(Collectors.toList());

        AnswerResponseDto response = new AnswerResponseDto(answerId, questionId, answerContent, createdAt, modifiedAt, comments);

        return response;
    }
}