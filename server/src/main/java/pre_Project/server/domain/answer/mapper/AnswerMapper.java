package pre_Project.server.domain.answer.mapper;

import org.mapstruct.Mapper;
import pre_Project.server.domain.answer.dto.AnswerPatchDto;
import pre_Project.server.domain.answer.dto.AnswerPostDto;
import pre_Project.server.domain.answer.dto.AnswerResponseDto;
import pre_Project.server.domain.answer.entity.Answer;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);
    List<AnswerResponseDto> AnswersToAnswerResponseDtos(List<Answer> answer);

}