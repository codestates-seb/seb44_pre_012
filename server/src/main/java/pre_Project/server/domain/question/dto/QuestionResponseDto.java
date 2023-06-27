package pre_Project.server.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pre_Project.server.domain.answer.dto.AnswerResponseDto;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponseDto {

    private Long questionId;
    private String questionTitle;
    private String questionContent;
//    private String userName;
    private int view;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<AnswerResponseDto> questionAnswers;

}
