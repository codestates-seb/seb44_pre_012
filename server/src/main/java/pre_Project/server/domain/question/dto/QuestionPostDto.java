package pre_Project.server.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class QuestionPostDto {

    @NotBlank
    private String questionTitle;

    @NotBlank
    private String questionContent;
}
