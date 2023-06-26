package pre_Project.server.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;

@Getter
@AllArgsConstructor
@Setter
@NoArgsConstructor
public class CommentPatchDto {

    private long commentId;

    @NotBlank(message = "댓글에는 내용이 있어야 합니다")
    private String commentContent;
}