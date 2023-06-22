package pre_Project.server.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class QuestionViewDto {
    private long questionId;
    private Integer view;
}
