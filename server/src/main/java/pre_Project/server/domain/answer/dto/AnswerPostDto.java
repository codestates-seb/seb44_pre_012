package pre_Project.server.domain.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerPostDto {
    private long questionId;
    @NotBlank(message = "답변에는 내용이 있어야 합니다.")
    private String answerContent;
}