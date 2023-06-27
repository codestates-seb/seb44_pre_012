package pre_Project.server.domain.question.mapper;

import org.mapstruct.Mapper;
import pre_Project.server.domain.answer.dto.AnswerResponseDto;
import pre_Project.server.domain.comment.dto.CommentResponseDto;
import pre_Project.server.domain.question.dto.QuestionPatchDto;
import pre_Project.server.domain.question.dto.QuestionPostDto;
import pre_Project.server.domain.question.dto.QuestionResponseDto;
import pre_Project.server.domain.question.entity.Question;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);

    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);

    default QuestionResponseDto questionToQuestionResponseDto(Question question) {
        if (question == null) {
            return null;
        }


        long questionId = question.getQuestionId();
        String questionTitle = question.getQuestionTitle();
        String questionContent = question.getQuestionContent();
        LocalDateTime createdAt = question.getCreatedAt();
        LocalDateTime modifiedAt = question.getModifiedAt();
        int view = question.getView();

        List<AnswerResponseDto> answers = question.getAnswers().stream()
                .map(answer -> {
                    List<CommentResponseDto> comments = answer.getComments().stream()
                            .map(comment -> new CommentResponseDto(
                                    comment.getCommentId(),
                                    comment.getAnswer().getAnswerId(),
                                    comment.getCommentContent(),
                                    comment.getCreatedAt(),
                                    comment.getModifiedAt())).sorted(Comparator.comparing(a -> a.getCommentId())).collect(Collectors.toList());

                    return new AnswerResponseDto(
                            answer.getAnswerId(),
                            answer.getQuestion().getQuestionId(),
                            answer.getAnswerContent(),
                            answer.getCreatedAt(),
                            answer.getModifiedAt(),
                            comments
                    );
                })
                .sorted(Comparator.comparing(a -> a.getAnswerId()))
                .collect(Collectors.toList());


        QuestionResponseDto response = new QuestionResponseDto(questionId, questionTitle, questionContent, view, createdAt, modifiedAt, answers);
        return response;
    }

    List<QuestionResponseDto> questionsToQuestionResponseDtos(List<Question> question);

}