package pre_Project.server.domain.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerPatchDto {

    private long answerId;

    @NotBlank(message = "답변에는 내용이 있어야 합니다.")
    private String answerContent;
    // +채택기능
}