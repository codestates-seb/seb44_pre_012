package pre_Project.server.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentPostDto {
    private long answerId;

    @NotBlank(message = "댓글에는 내용이 있어야 합니다.")
    private String commentContent;
}