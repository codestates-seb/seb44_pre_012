package pre_Project.server.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseDto {
    private long commentId;
    private long answerId;
    private String commentContent;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}