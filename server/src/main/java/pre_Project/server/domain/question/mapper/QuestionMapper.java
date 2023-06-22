package pre_Project.server.domain.question.mapper;

import org.mapstruct.Mapper;
import pre_Project.server.domain.question.dto.QuestionPatchDto;
import pre_Project.server.domain.question.dto.QuestionPostDto;
import pre_Project.server.domain.question.dto.QuestionResponseDto;
import pre_Project.server.domain.question.dto.QuestionViewDto;
import pre_Project.server.domain.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);

    QuestionResponseDto questionToQuestionResponseDto(Question question);
    List<QuestionResponseDto> questionsToQuestionResponseDtos(List<Question> question);

    Question questionViewToQuestion(QuestionViewDto questionViewDto);
}