package pre_Project.server.domain.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
// import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerResponseDto {
    private long answerId;
    private String answerContent;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    // +댓글기능 private List<Long> commentIds;
}